import type { GlobalConfig } from "payload";

const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    description: "Manage the site navigation links. Changes here reflect on the live site immediately.",
  },
  fields: [
    {
      name: "logo",
      type: "text",
      label: "Site Name / Logo Text",
      defaultValue: "Storefront",
      admin: { description: "The brand name shown in the top-left of the navbar." },
    },
    {
      name: "links",
      type: "array",
      label: "Nav Links",
      minRows: 1,
      maxRows: 8,
      admin: { description: "Add, remove, or reorder navigation links. Drag to reorder.", initCollapsed: false },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Label", required: true, admin: { width: "50%" } },
            { name: "href",  type: "text", label: "URL",   required: true, admin: { width: "50%", description: "e.g. /shop or https://example.com" } },
          ],
        },
        { name: "openInNewTab", type: "checkbox", label: "Open in new tab", defaultValue: false },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Call-to-Action Button",
      admin: { description: "The button shown on the right side of the navbar." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Button Label", defaultValue: "Shop Now", admin: { width: "50%" } },
            { name: "href",  type: "text", label: "Button URL",   defaultValue: "/shop",    admin: { width: "50%" } },
          ],
        },
      ],
    },
  ],
};

export default Navigation;