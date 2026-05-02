import type { GlobalConfig } from "payload";

const HomepageHero: GlobalConfig = {
  slug: "homepage-hero",
  label: "Homepage Hero",
  admin: {
    description:
      "Controls the full-screen hero section on the homepage. Changes reflect on the live site immediately.",
  },
  fields: [
    // ── Background type selector ──────────────────────────────
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
        description:
          "Choose what fills the hero background. Upload your media below after selecting.",
      },
    },

    // ── Background image ──────────────────────────────────────
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
      admin: {
        description:
          "Shown when Background Type is set to 'Image'. Recommended: at least 1920×1080px.",
        condition: (_, siblingData) => siblingData?.backgroundType === "image",
      },
    },

    // ── Background video ──────────────────────────────────────
    {
      name: "backgroundVideo",
      type: "upload",
      relationTo: "media",
      label: "Background Video",
      admin: {
        description:
          "Shown when Background Type is set to 'Video'. Upload an MP4. Keep under 10MB for fast loading. The video loops silently and autoplays.",
        condition: (_, siblingData) => siblingData?.backgroundType === "video",
      },
    },

    // ── Overlay opacity ───────────────────────────────────────
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
        description:
          "Dark overlay on top of the image/video to keep text readable. Not used for gradient backgrounds.",
        condition: (_, siblingData) =>
          siblingData?.backgroundType === "image" ||
          siblingData?.backgroundType === "video",
      },
    },

    // ── Gradient colours (shown only when type = gradient) ────
    {
      name: "gradientColors",
      type: "group",
      label: "Gradient Blob Colours",
      admin: {
        description:
          "Controls the four aurora blobs. Use any valid CSS colour (hex, hsl, rgb).",
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
              defaultValue: "#6d28d9",
              admin: { width: "25%" },
            },
            {
              name: "bottomLeft",
              type: "text",
              label: "Bottom left",
              defaultValue: "#9f1239",
              admin: { width: "25%" },
            },
            {
              name: "midLeft",
              type: "text",
              label: "Mid left",
              defaultValue: "#1e40af",
              admin: { width: "25%" },
            },
            {
              name: "bottomRight",
              type: "text",
              label: "Bottom right",
              defaultValue: "#581c87",
              admin: { width: "25%" },
            },
          ],
        },
      ],
    },

    // ── Headline ──────────────────────────────────────────────
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "A living catalog.",
      admin: {
        description: "Large display text. Keep under 5 words.",
      },
    },

    // ── Pill badge ────────────────────────────────────────────
    {
      name: "badge",
      type: "text",
      label: "Pill Badge Text",
      defaultValue: "New arrivals every week",
      admin: {
        description: "Animated pill above the headline. Leave blank to hide.",
      },
    },

    // ── CTAs ──────────────────────────────────────────────────
    {
      name: "primaryCta",
      type: "group",
      label: "Primary Button",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              label: "Label",
              defaultValue: "Browse the catalog",
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              label: "URL",
              defaultValue: "/shop",
              admin: { width: "50%" },
            },
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
            {
              name: "label",
              type: "text",
              label: "Label",
              defaultValue: "Learn more",
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              label: "URL",
              defaultValue: "/about",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },

    // ── Scroll cue ────────────────────────────────────────────
    {
      name: "scrollLabel",
      type: "text",
      label: "Scroll Cue Label",
      defaultValue: "Scroll",
      admin: {
        description: "Tiny label above the scroll line. Leave blank to hide.",
      },
    },
  ],
};

export default HomepageHero;