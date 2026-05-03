import type { GlobalConfig } from "payload";

const HomepageHero: GlobalConfig = {
  slug: "homepage-hero",
  label: "Homepage Hero",
  admin: {
    description: "Controls the full-screen hero section on the homepage. Changes reflect on the live site immediately.",
  },
  fields: [
    {
      name: "backgroundType",
      type: "select",
      label: "Background Type",
      required: true,
      defaultValue: "gradient",
      options: [
        { label: "Gradient (colour blobs)", value: "gradient" },
        { label: "Image",                   value: "image"    },
        { label: "Video",                   value: "video"    },
      ],
      admin: {
        description: "Choose what fills the hero background. Upload your media below after selecting.",
      },
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === "image",
      },
    },
    {
      name: "backgroundVideo",
      type: "upload",
      relationTo: "media",
      label: "Background Video",
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === "video",
      },
    },
    {
      name: "overlayOpacity",
      type: "select",
      label: "Dark Overlay Intensity",
      defaultValue: "medium",
      options: [
        { label: "Light  (20%)", value: "light"  },
        { label: "Medium (50%)", value: "medium" },
        { label: "Heavy  (75%)", value: "heavy"  },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === "image" || siblingData?.backgroundType === "video",
      },
    },
    {
      name: "gradientColors",
      type: "group",
      label: "Gradient Blob Colours",
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === "gradient",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "topRight",
              type: "text",
              label: "Top right",
              defaultValue: "#C9962A",
              admin: { width: "25%" },
            },
            {
              name: "bottomLeft",
              type: "text",
              label: "Bottom left",
              defaultValue: "#8D5524",
              admin: { width: "25%" },
            },
            {
              name: "midLeft",
              type: "text",
              label: "Mid left",
              defaultValue: "#4A2912",
              admin: { width: "25%" },
            },
            {
              name: "bottomRight",
              type: "text",
              label: "Bottom right",
              defaultValue: "#F5C842",
              admin: { width: "25%" },
            },
          ],
        },
      ],
    },
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "A living catalog.",
      admin: { description: "Large display text. Keep under 5 words." },
    },
    {
      name: "badge",
      type: "text",
      label: "Pill Badge Text",
      defaultValue: "New arrivals every week",
      admin: { description: "Animated pill above the headline. Leave blank to hide." },
    },
    {
      name: "primaryCta",
      type: "group",
      label: "Primary Button",
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Label", defaultValue: "Browse the catalog", admin: { width: "50%" } },
            { name: "href",  type: "text", label: "URL",   defaultValue: "/shop",               admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "secondaryCta",
      type: "group",
      label: "Secondary Link",
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Label", defaultValue: "Learn more", admin: { width: "50%" } },
            { name: "href",  type: "text", label: "URL",   defaultValue: "/about",     admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "scrollLabel",
      type: "text",
      label: "Scroll Cue Label",
      defaultValue: "Scroll",
      admin: { description: "Tiny label above the scroll line. Leave blank to hide." },
    },
  ],
};

export default HomepageHero;