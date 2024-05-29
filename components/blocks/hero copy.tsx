import * as React from "react";
import { Actions } from "../util/actions";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };
  const isImageLeft = data.layout === "image-left";
  const containerClass = `grid grid-cols-1 md:grid-cols-5 gap-14 items-center justify-center`;
  const contentClass = isImageLeft
    ? "md:col-start-3"
    : "md:col-start-1 row-start-2 md-row-start-1";
  const imageClass = isImageLeft
    ? "md:col-start-1 row-start-1"
    : "md:col-start-4 md:row-start-2 row-start-1";
  const backgroundImageSrc = data.bgimg?.src || "";
  const bgContainerStyle = {
    backgroundImage: `url(${backgroundImageSrc})`,
    backgroundSize: data.bgimg?.backgroundSize || "cover",
    backgroundPosition: data.bgimg?.backgroundPosition || "center center",
    backgroundRepeat: data.bgimg?.backgroundRepeat || "no-repeat",
  };
  return (
    <Section color={data.color} bgimg={backgroundImageSrc}>
      <Container size="large" className={containerClass}>
        <div
          className={`md:col-span-3 ${contentClass} text-center md:text-left`}
        >
          {data.tagline && (
            <h2
              data-tina-field={tinaField(data, "tagline")}
              className="relative inline-block px-3 py-1 mb-8 text-md font-bold tracking-wide title-font z-20"
            >
              {data.tagline}
              <span className="absolute w-full h-full left-0 top-0 rounded-full -z-1 bg-current opacity-7"></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : data.color === "orange"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.headline}
              </span>
            </h3>
          )}
          {data.text && (
            <div
              data-tina-field={tinaField(data, "text")}
              className={`prose mx-auto md:mx-0 mb-10 ${
                data.color === "primary"
                  ? `prose-primary`
                  : data.color === "orange"
                  ? `prose-orange`
                  : `dark:prose-dark`
              }`}
            >
              <TinaMarkdown content={data.text} />
            </div>
          )}
          {data.actions && (
            <Actions
              className="justify-center md:justify-start py-2"
              parentColor={data.color}
              actions={data.actions}
            />
          )}
        </div>
        {data.image && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className={`relative md:col-span-2  ${imageClass}`}
          >
            <h3
              data-tina-field={tinaField(data.image, "titleHeading")}
              className={`w-full relative	mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span className={`bg-clip-text text-black `}>
                {data.image.titleHeading}
              </span>
            </h3>
            <div className={`flex justify-center`}>
              <img
                className="absolute w-full rounded-lg max-w-xs md:max-w-none h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                src={data.image.src}
                aria-hidden="true"
              />
              <img
                className="relative w-full max-w-xs rounded-lg md:max-w-none h-auto"
                alt={data.image.alt}
                src={data.image.src}
              />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export const heroBlockSchema: TinaTemplate = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      label: "Text",
      name: "text",
      type: "rich-text",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "titleHeading",
          label: "Title Heading",
          type: "string",
        },
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Layout",
      name: "layout",
      options: [
        { label: "Image Left", value: "image-left" },
        { label: "Image Right", value: "image-right" },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Orange", value: "orange" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "object",
      label: "Background Image",
      name: "bgimg",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
        {
          type: "string",
          label: "Background Size",
          name: "backgroundSize",
          options: [
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
            { label: "Auto", value: "auto" },
          ],
        },
        {
          type: "string",
          label: "Background Position",
          name: "backgroundPosition",
          options: [
            { label: "Center Center", value: "center center" },
            { label: "Top Center", value: "top center" },
            { label: "Bottom Center", value: "bottom center" },
            { label: "Left Center", value: "left center" },
            { label: "Right Center", value: "right center" },
          ],
        },
        {
          type: "string",
          label: "Background Repeat",
          name: "backgroundRepeat",
          options: [
            { label: "No-repeat", value: "no-repeat" },
            { label: "Repeat", value: "repeat" },
            { label: "Repeat-x", value: "repeat-x" },
            { label: "Repeat-y", value: "repeat-y" },
          ],
        },
      ],
    },
  ],
};
