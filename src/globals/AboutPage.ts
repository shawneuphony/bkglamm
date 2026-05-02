import type { GlobalConfig } from "payload";

const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: {
    description:
      "Controls all content on the /about page. Edit each section independently.",
  },
  fields: [
    // ── Hero section ──────────────────────────────────────────
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          label: "Eyebrow Text",
          defaultValue: "Our story",
          admin: {
            description: "Small uppercase label above the headline.",
          },
        },
        {
          name: "headline",
          type: "text",
          label: "Headline",
          required: true,
          defaultValue: "We curate what matters.",
          admin: {
            description: "Large display headline. Keep under 6 words.",
          },
        },
        {
          name: "subtext",
          type: "textarea",
          label: "Subtext",
          defaultValue:
            "We started with a simple belief — that great products shouldn't be hard to find. So we built a catalog that does the searching for you.",
          admin: { rows: 3 },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Hero Image",
          admin: {
            description: "Full-width image beneath the headline. Recommended: 1600×900px landscape.",
          },
        },
      ],
    },

    // ── Mission section ───────────────────────────────────────
    {
      name: "mission",
      type: "group",
      label: "Mission Section",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Section Label",
          defaultValue: "What we believe",
        },
        {
          name: "statement",
          type: "textarea",
          label: "Mission Statement",
          defaultValue:
            "Our mission is to connect people with products that are made thoughtfully, priced fairly, and built to last.",
          admin: { rows: 3 },
        },
        {
          name: "pillars",
          type: "array",
          label: "Value Pillars",
          maxRows: 4,
          admin: {
            description: "Three or four short value statements shown as cards.",
            initCollapsed: true,
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
              admin: { rows: 2 },
            },
          ],
        },
      ],
    },

    // ── Stats row ─────────────────────────────────────────────
    {
      name: "stats",
      type: "array",
      label: "Stats / Numbers",
      maxRows: 4,
      admin: {
        description: "Numbers that tell your story — e.g. '500+ Products', '12,000 Customers'.",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Value",
              required: true,
              admin: {
                width: "40%",
                description: 'e.g. "500+"',
              },
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              required: true,
              admin: {
                width: "60%",
                description: 'e.g. "Products curated"',
              },
            },
          ],
        },
      ],
    },

    // ── Team section ──────────────────────────────────────────
    {
      name: "team",
      type: "group",
      label: "Team Section",
      admin: {
        description: "Optional. Leave members empty to hide this section.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Section Label",
          defaultValue: "The people behind it",
        },
        {
          name: "headline",
          type: "text",
          label: "Headline",
          defaultValue: "Built by a small team with big taste.",
        },
        {
          name: "members",
          type: "array",
          label: "Team Members",
          maxRows: 8,
          admin: { initCollapsed: true },
          fields: [
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Photo",
            },
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Name",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "role",
                  type: "text",
                  label: "Role / Title",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "bio",
              type: "textarea",
              label: "Short Bio",
              admin: { rows: 2 },
            },
          ],
        },
      ],
    },

    // ── CTA section ───────────────────────────────────────────
    {
      name: "cta",
      type: "group",
      label: "Bottom CTA Section",
      fields: [
        {
          name: "headline",
          type: "text",
          label: "Headline",
          defaultValue: "Ready to explore the catalog?",
        },
        {
          name: "subtext",
          type: "text",
          label: "Subtext",
          defaultValue: "Browse products curated for real life.",
        },
        {
          type: "row",
          fields: [
            {
              name: "buttonLabel",
              type: "text",
              label: "Button Label",
              defaultValue: "Shop now",
              admin: { width: "50%" },
            },
            {
              name: "buttonHref",
              type: "text",
              label: "Button URL",
              defaultValue: "/shop",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};

export default AboutPage;