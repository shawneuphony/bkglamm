import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Product",
    plural:   "Products",
  },
  admin: {
    useAsTitle:    "name",
    defaultColumns: ["name", "category", "price", "status"],
    description:   "Add products here. They appear on the storefront catalog grid automatically.",
    listSearchableFields: ["name", "description"],
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    // Anyone can read published products on the frontend
    read: ({ req }) => {
      if (req.user) return true; // admins see everything
      return {
        status: { equals: "published" },
      };
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // ── Core identity ─────────────────────────────────────────
    {
      name: "name",
      type: "text",
      label: "Product Name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      required: true,
      unique: true,
      admin: {
        description: 'Auto-filled from name. e.g. "my-product" → /shop/my-product',
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // Auto-generate slug from name if not set
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },

    // ── Media ─────────────────────────────────────────────────
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 8,
      admin: {
        description: "First image is shown in the catalog grid. Add more for the product detail page.",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          label: "Alt text",
          admin: {
            description: "Describe the image for accessibility.",
          },
        },
      ],
    },

    // ── Pricing ───────────────────────────────────────────────
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "number",
          label: "Price (BWP)",
          required: true,
          min: 0,
          admin: {
            width: "50%",
            description: "Enter price in Pula (e.g. 250 = P250.00)",
          },
        },
        {
          name: "compareAtPrice",
          type: "number",
          label: "Compare-at Price (BWP)",
          min: 0,
          admin: {
            width: "50%",
            description: "Original price shown as strikethrough. Leave blank if no sale.",
          },
        },
      ],
    },

    // ── Category & Tags ───────────────────────────────────────
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Category",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      admin: {
        position: "sidebar",
        description: "Optional tags for filtering (e.g. 'new', 'featured', 'sale')",
      },
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },

    // ── Description ───────────────────────────────────────────
    {
      name: "description",
      type: "textarea",
      label: "Short Description",
      admin: {
        description: "Shown on the catalog grid card. Keep it under 120 characters.",
        rows: 3,
      },
    },
    {
      name: "details",
      type: "richText",
      label: "Full Product Details",
      admin: {
        description: "Shown on the product detail page. Supports formatting.",
      },
    },

    // ── Inventory ─────────────────────────────────────────────
    {
      name: "stock",
      type: "number",
      label: "Stock Quantity",
      defaultValue: 0,
      min: 0,
      admin: {
        position: "sidebar",
        description: "Set to 0 to mark as out of stock.",
      },
    },

    // ── Flags ─────────────────────────────────────────────────
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Product",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Featured products appear first in the catalog grid.",
      },
    },

    // ── Status ────────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      label: "Status",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft",     value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived",  value: "archived" },
      ],
      admin: {
        position: "sidebar",
        description: "Only 'Published' products appear on the frontend.",
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug if still missing at save time
        if (!data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }
        return data;
      },
    ],
  },

  timestamps: true,
};