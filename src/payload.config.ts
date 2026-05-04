import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import Navigation  from './globals/Navigation'
import HomepageHero from './globals/HomepageHero'
import SiteFooter   from './globals/SiteFooter'
import AboutPage    from './globals/AboutPage'
import SiteSettings from './globals/SiteSettings'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media }       from './collections/Media'
import { Pages }       from './collections/Pages'
import { Posts }       from './collections/Posts'
import { Users }       from './collections/Users'
import { Products }    from './collections/Products'
import { Footer }      from './Footer/config'
import { Header }      from './Header/config'
import { plugins }     from './plugins'
import { defaultLexical }   from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname  = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin:     ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667  },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900  },
      ],
    },
  },
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, Products],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    Navigation,
    HomepageHero,
    SiteFooter,
    AboutPage,
    SiteSettings,
  ],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})