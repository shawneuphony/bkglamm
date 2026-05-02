import type { GlobalConfig } from "payload";

const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Global site-wide settings. WhatsApp number, contact details, and other configuration used across the site.",
  },
  fields: [
    // ── WhatsApp ──────────────────────────────────────────────
    {
      name: "whatsappNumber",
      type: "text",
      label: "WhatsApp Number",
      required: true,
      defaultValue: "26771234567",
      admin: {
        description:
          "Include country code, no + or spaces. Botswana example: 26771234567 (267 = country code, then your number). This is used for the 'Book Now' button on all product pages.",
      },
    },

    // ── Contact ───────────────────────────────────────────────
    {
      name: "contactEmail",
      type: "email",
      label: "Contact Email",
      admin: {
        description: "Shown on the contact page and footer.",
      },
    },
    {
      name: "contactPhone",
      type: "text",
      label: "Contact Phone",
      admin: {
        description: "Display-only phone number shown on the contact page.",
      },
    },
    {
      name: "address",
      type: "textarea",
      label: "Physical Address",
      admin: {
        description: "Shown on the contact page.",
        rows: 2,
      },
    },

    // ── SEO defaults ──────────────────────────────────────────
    {
      name: "siteTitle",
      type: "text",
      label: "Default Site Title",
      defaultValue: "Storefront",
      admin: {
        description: "Used as the default page title and in browser tabs.",
      },
    },
    {
      name: "siteDescription",
      type: "textarea",
      label: "Default Meta Description",
      defaultValue: "A living catalog of products made for real life.",
      admin: {
        description: "Default description used in search engine results.",
        rows: 2,
      },
    },
  ],
};

export default SiteSettings;