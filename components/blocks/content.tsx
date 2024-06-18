import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Actions } from "../util/actions";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";


export const Content = ({ data }: { data: PageBlocksContent }) => {
  // const backgroundImageSrc = data.bgimg?.src || "";

  const sectionBackgroundImage =
    data.bgimg?.bgOption === "section" ? data.bgimg.src || "" : "";
  const containerBackgroundImage =
    data.bgimg?.bgOption === "container" ? data.bgimg.src || "" : "";

  const containerClass = `prose ${data.marginTop} ${data.cPadding} ${
    data.inlineItems
  } ${data.bgimg?.backgroundRepeat} ${data.bgimg?.backgroundPosition} ${
    data.bgimg?.backgroundSize
  } ${data.alignment} ${data.textColor} ${data.hFontSize} ${
    data.bgimg?.containerRound
  }
  ${
    data.color === "primary"
      ? `prose-primary`
      : data.color === "orange"
      ? `prose-orange`
      : ``
  }`;

  const renderImageDiv = (imgSrc, mbClass) => {
    if (!imgSrc || !imgSrc.src) return null;
    return (
      <div data-tina-field={tinaField(imgSrc, "src")} className={mbClass}>
        <img
          src={imgSrc.src}
          className={`${imgSrc.imgSize || ""} ${imgSrc.imgMargin || ""} ${
            imgSrc.imgWidth || ""
          } ${imgSrc.imgHeight || ""} ${imgSrc.imgPosition || ""}`}
          alt={imgSrc.alt || ""}
          aria-hidden="true"
        />
      </div>
    );
  };

  return (
    <Section
      color={data.color}
      bgimg={sectionBackgroundImage}
      className={`${data.bgimg?.backgroundSize} ${data.bgimg?.backgroundPosition} ${data.bgimg?.backgroundRepeat} ${data.sPadding}`}
    >
      {data.imgSrc?.imgOption === "sectionImage" &&
        renderImageDiv(data.imgSrc, "mb-16")}

      <Container
        size={data.size}
        bgimg={containerBackgroundImage}
        className={containerClass}
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown content={data.body} />
        {data.actions && (
          <Actions
            className={`${data.actions[0]?.btnPosition || ""} py-2 mt-5`}
            parentColor={data.color}
            actions={data.actions}
          />
        )}
        {data.imgSrc?.imgOption === "containerImage" &&
          renderImageDiv(data.imgSrc, "mb-16")}
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "List Item Alignment",
      name: "inlineItems",
      options: [{ label: "inline", value: "inline-items" }],
    },
    {
      type: "string",
      label: "Margin Top",
      name: "marginTop",
      options: [
        { label: "mt-5", value: "mt-5" },
        { label: "mt-10", value: "mt-10" },
        { label: "mt-15", value: "mt-15" },
        { label: "mt-24", value: "mt-24" },
        { label: "mt-28", value: "mt-28" },
        { label: "mt-32", value: "mt-32" },
      ],
    },
    {
      type: "string",
      label: "Text Color",
      name: "textColor",
      options: [
        { label: "Black", value: "text-black" },
        { label: "Blue", value: "text-blue-500" },
        { label: "Orange", value: "text-orange-500" },
        { label: "White", value: "text-white" },
      ],
    },
    {
      type: "string",
      label: "Heading Font Size",
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
      type: "object",
      label: "Upload Image",
      name: "imgSrc",
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
          label: "Image Contain Option",
          name: "imgOption",
          options: [
            { label: "Section", value: "sectionImage" },
            { label: "Container", value: "containerImage" },
          ],
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
          label: "Image Position",
          name: "imgPosition",
          options: [
            { label: "Center", value: "mx-auto" },
            { label: "Left", value: "ml-0 mr-auto" },
            { label: "Right", value: "mr-0 ml-auto" },
          ],
        },
        {
          type: "string",
          label: "Image Margin",
          name: "imgMargin",
          options: [
            { label: "my-0", value: "mt-0 mb-0" },
            { label: "my-10", value: "my-10" },
            { label: "my-14", value: "my-14" },
            { label: "my-16", value: "my-16" },
            { label: "my-20", value: "my-20" },
            { label: "my-24", value: "my-24" },
            { label: "my-28", value: "my-28" },
          ],
        },
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
          label: "Container Round",
          name: "containerRound",
          options: [
            { label: "rounded", value: "rounded" },
            { label: "rounded-md", value: "rounded-md" },
            { label: "rounded-lg", value: "rounded-lg" },
            { label: "rounded-full", value: "rounded-full" },
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
          label: "Button Position",
          name: "btnPosition",
          type: "string",
          options: [
            { label: "Left", value: "justify-start" },
            { label: "Center", value: "justify-center" },
            { label: "Right", value: "justify-end" },
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
  ],
};
