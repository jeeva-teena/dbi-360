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
    blue: "from-blue-500 to-blue-500",
    teal: "from-teal-500 to-teal-500",
    green: "from-green-500 to-green-500",
    red: "from-red-500 to-red-500",
    pink: "from-pink-500 to-pink-500",
    purple: "from-purple-500 to-purple-500",
    orange: "from-orange-500 to-orange-500",
    yellow: "from-yellow-500 to-yellow-500",
  };
  const isImageLeft = data.layout === "image-left";
  const containerClass = `grid grid-cols-1 md:grid-cols-5 md:gap-x-14 md:gap-y-0 gap-x-0 gap-y-14 items-center justify-center ${data.cPadding} ${data.alignment} ${data.bgimg?.backgroundRepeat} ${data.bgimg?.backgroundPosition} ${data.bgimg?.backgroundSize}`;
  const contentClass = isImageLeft
    ? "md:col-start-3"
    : "md:col-start-1 row-start-2 md-row-start-1";
  const imageClass = isImageLeft
    ? "md:col-start-1 row-start-1"
    : "md:col-start-4 md:row-start-2 row-start-1";

  const backgroundImageSrc = data.bgimg?.src || "";

  return (
    <Section
      color={data.color}
      bgimg={data.bgimg?.bgOption === "section" ? backgroundImageSrc : ""}
      className={`${data.bgimg?.backgroundSize} ${data.bgimg?.backgroundPosition} ${data.bgimg?.backgroundRepeat} ${data.sPadding}`}
    >
      <Container
        size={data.size}
        className={containerClass}
        bgimg={data.bgimg?.bgOption === "container" ? backgroundImageSrc : ""}
      >
        <div className={`md:col-span-3 ${contentClass} `}>
          {data.tagline && (
            <h2
              data-tina-field={tinaField(data, "tagline")}
              className="relative inline-block px-3 py-1 mb-3 text-md font-bold tracking-wide title-font z-20"
            >
              {data.tagline}
              <span className="absolute w-full h-full left-0 top-0 rounded-full -z-1 bg-current opacity-7"></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`w-full relative	mb-5 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-extrabold tracking-normal leading-tight title-font`}
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
              className={` ${data.inlineItems} ${data.hFontSize} prose md:mx-0 mb-10 ${
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
            {data.image.titleHeading && (
              <h3
                data-tina-field={tinaField(data.image, "titleHeading")}
                className={`w-full relative	mb-10 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-extrabold tracking-normal leading-tight title-font`}
              >
                <span className={`bg-clip-text text-black `}>
                  {data.image.titleHeading}
                </span>
              </h3>
            )}
            <div className={`flex justify-center`}>
              <img
                className={`absolute rounded-lg blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light ${data.image.imgSize} ${data.image.imgWidth} ${data.image.imgHeight} ${data.image.imgPosition}`}
                src={data.image.src}
                aria-hidden="true"
              />
              <img
                className={`${data.image.imgSize} ${data.image.imgWidth} ${data.image.imgHeight} ${data.image.imgPosition} relative rounded-lg`}
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
      type: "string",
      label: "List Item Alignment",
      name: "inlineItems",
      options: [{ label: "inline", value: "inline-items" }],
    },
    {
      type: "string",
      label: "Editor Font Size",
      name: "hFontSize",
      options: [
        { label: "Small", value: "md:text-sm text-xs" },
        { label: "Base", value: "md:text-base text-sm" },
        { label: "Large", value: "md:text-lg text-base" },
        { label: "Extra Large", value: "md:text-xl text-lg" },
        { label: "2XL", value: "md:text-2xl text-xl" },
        { label: "3XL", value: "md:text-3xl text-2xl" },
        { label: "4XL", value: "md:text-4xl text-3xl" },
        { label: "5XL", value: "md:text-5xl text-4xl" },
      ],
    },
    {
      type: "string",
      label: "Text Alignment",
      name: "alignment",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
        { label: "Justify", value: "text-justify" },
      ],
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
        {
          type: "string",
          label: "Image Width",
          name: "imgWidth",
          options: [
            { label: "w-full", value: "w-full" },
            { label: "w-screen", value: "w-screen" },
            { label: "w-24", value: "w-24" },
            { label: "w-32", value: "w-32" },
            { label: "w-40", value: "w-40" },
            { label: "w-48", value: "w-48" },
            { label: "w-64", value: "w-64" },
            { label: "w-80", value: "w-80" },
            { label: "w-96", value: "w-96" },
          ],
        },
        {
          type: "string",
          label: "Image Height",
          name: "imgHeight",
          options: [
            { label: "h-full", value: "h-full" },
            { label: "h-screen", value: "h-screen" },
            { label: "h-24", value: "h-24" },
            { label: "h-32", value: "h-32" },
            { label: "h-40", value: "h-40" },
            { label: "h-48", value: "h-48" },
            { label: "h-64", value: "h-64" },
            { label: "h-80", value: "h-80" },
            { label: "h-96", value: "h-96" },
          ],
        },
        {
          type: "string",
          label: "Image Size",
          name: "imgSize",
          options: [
            { label: "Cover", value: "object-cover" },
            { label: "Contain", value: "object-contain" },
            { label: "Fill", value: "object-fill" },
          ],
        },
        {
          type: "string",
          label: "Image position",
          name: "imgPosition",
          options: [
            { label: "Center", value: "mx-auto" },
            { label: "Left", value: "ml-0 mr-auto" },
            { label: "Right", value: "mr-0 ml-auto" },
          ],
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
      type: "string",
      label: "Container Size",
      name: "size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    {
      type: "string",
      label: "Container Padding",
      name: "cPadding",
      options: [
        { label: "py-0", value: "pt-0 pb-0" },
        { label: "py-5", value: "py-5" },
        { label: "py-10", value: "py-10" },
        { label: "py-14", value: "py-14" },
        { label: "py-16", value: "py-16" },
        { label: "py-20", value: "py-20" },
        { label: "py-24", value: "py-24" },
        { label: "py-28", value: "py-28" },
      ],
    },
    {
      type: "string",
      label: "Section Padding",
      name: "sPadding",
      options: [
        { label: "py-0", value: "pt-0 pb-0" },
        { label: "py-5", value: "py-5" },
        { label: "py-10", value: "py-10" },
        { label: "py-14", value: "py-14" },
        { label: "py-16", value: "py-16" },
        { label: "py-20", value: "py-20" },
        { label: "py-24", value: "py-24" },
        { label: "py-28", value: "py-28" },
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
          label: "Background Image Option",
          name: "bgOption",
          options: [
            { label: "Container", value: "container" },
            { label: "Section", value: "section" },
          ],
        },
        {
          type: "string",
          label: "Background Size",
          name: "backgroundSize",
          options: [
            { label: "Cover", value: "bg-cover" },
            { label: "Contain", value: "bg-contain" },
            { label: "Auto", value: "bg-auto" },
          ],
        },
        {
          type: "string",
          label: "Background Position",
          name: "backgroundPosition",
          options: [
            { label: "Center", value: "bg-center" },
            { label: "Top", value: "bg-top" },
            { label: "Bottom", value: "bg-bottom" },
            { label: "Left", value: "bg-left" },
            { label: "Left Top", value: "bg-left-top" },
            { label: "Left Bottom", value: "bg-left-bottom" },
            { label: "Right", value: "bg-right" },
            { label: "Right Top", value: "bg-right-top" },
            { label: "Right Bottom", value: "bg-right-bottom" },
          ],
        },
        {
          type: "string",
          label: "Background Repeat",
          name: "backgroundRepeat",
          options: [
            { label: "No-repeat", value: "bg-no-repeat" },
            { label: "Repeat", value: "bg-repeat" },
            { label: "Repeat-x", value: "bg-repeat-x" },
            { label: "Repeat-y", value: "bg-repeat-y" },
          ],
        },
      ],
    },
  ],
};
