import type { GlobalConfig } from "payload";

const SiteFooter: GlobalConfig = {
  slug: "site-footer",
  label: "Footer",
  admin: {
    description:
      "Controls the site-wide footer. All columns, links, tagline and social links are editable here.",
  },
  fields: [
    // ── Brand column ──────────────────────────────────────────
    {
      name: "brandName",
      type: "text",
      label: "Brand Name",
      defaultValue: "Storefront",
      admin: { description: "Displayed in the top-left of the footer." },
    },
    {
      name: "tagline",
      type: "textarea",
      label: "Tagline",
      defaultValue: "A living catalog of products made for real life.",
      admin: {
        description: "Short sentence beneath the brand name. Keep under 120 characters.",
        rows: 2,
      },
    },

    // ── Link columns ──────────────────────────────────────────
    {
      name: "columns",
      type: "array",
      label: "Link Columns",
      minRows: 1,
      maxRows: 4,
      admin: {
        description: "Each column has a heading and a list of links. Drag to reorder.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Column Heading",
          required: true,
        },
        {
          name: "links",
          type: "array",
          label: "Links",
          minRows: 1,
          maxRows: 8,
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Label",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "href",
                  type: "text",
                  label: "URL",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "openInNewTab",
              type: "checkbox",
              label: "Open in new tab",
              defaultValue: false,
            },
          ],
        },
      ],
    },

    // ── Social links ──────────────────────────────────────────
    {
      name: "socials",
      type: "array",
      label: "Social Links",
      maxRows: 6,
      admin: {
        description:
          "Shown as icon links in the footer. Supported platforms: instagram, twitter, facebook, tiktok, linkedin, youtube.",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "platform",
              type: "select",
              label: "Platform",
              required: true,
              options: [
                { label: "Instagram",   value: "instagram" },
                { label: "Twitter / X", value: "twitter"   },
                { label: "Facebook",    value: "facebook"  },
                { label: "TikTok",      value: "tiktok"    },
                { label: "LinkedIn",    value: "linkedin"  },
                { label: "YouTube",     value: "youtube"   },
              ],
              admin: { width: "40%" },
            },
            {
              name: "url",
              type: "text",
              label: "Profile URL",
              required: true,
              admin: { width: "60%" },
            },
          ],
        },
      ],
    },

    // ── Bottom bar ────────────────────────────────────────────
    {
      name: "copyrightText",
      type: "text",
      label: "Copyright Text",
      defaultValue: "All rights reserved.",
      admin: {
        description:
          'Shown beside the year and brand name. e.g. "All rights reserved."',
      },
    },
    {
      name: "bottomLinks",
      type: "array",
      label: "Bottom Bar Links",
      maxRows: 4,
      admin: {
        description: "Small links in the bottom bar — Privacy Policy, Terms, etc.",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              label: "Label",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              label: "URL",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};

export default SiteFooter;