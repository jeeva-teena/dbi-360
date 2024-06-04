import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Actions } from "../util/actions";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  const backgroundImageSrc = data.bgimg?.src || "";
  const backgroundSize = data.bgimg?.backgroundSize || "cover";
  const backgroundPosition = data.bgimg?.backgroundPosition || "center center";
  const backgroundRepeat = data.bgimg?.backgroundRepeat || "no-repeat";
  const bgContainerStyle = {
    backgroundImage: `url(${backgroundImageSrc})`,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
  };

  return (
    <Section
      color={data.color}
      bgimg={data.bgimg?.bgOption === "section" ? backgroundImageSrc : ""}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
      backgroundRepeat={backgroundRepeat}
    >
      {data.imgSrc && (
        <div data-tina-field={tinaField(data.imgSrc, "src")} className="mb-16">
          <img src={data.imgSrc.src} aria-hidden="true" />
        </div>
      )}
      {!data.imgSrc && (
        <>
          {data.bgimg?.bgOption === "container" ? (
            <Container
              className={`prose pt-24 pb-24 rounded-lg text-${data.alignment} text-${
                data.textColor
              } ${data.hFontSize}
              ${
                data.color === "primary"
                  ? `prose-primary`
                  : data.color === "orange"
                  ? `prose-orange`
                  : ``
              }
             `}
              data-tina-field={tinaField(data, "body")}
              style={{
                ...bgContainerStyle,
              }}
            >
              <TinaMarkdown content={data.body} />
              <div>
                {data.actions && (
                  <Actions
                    className="justify-center py-2 mt-5"
                    parentColor={data.color}
                    actions={data.actions}
                  />
                )}
              </div>
            </Container>
          ) : (
            <Container
              width={data.width}
              className={`prose ${data.hFontSize} text-${data.alignment} ${
                data.marginTop
              } text-${data.textColor} ${
                data.color === "primary"
                  ? `prose-primary`
                  : data.color === "orange"
                  ? `prose-orange`
                  : ``
              }`}
              data-tina-field={tinaField(data, "body")}
              size="large"
            >
              <TinaMarkdown content={data.body} />
              <div>
                {data.actions && (
                  <Actions
                    className="justify-center py-2 mt-5"
                    parentColor={data.color}
                    actions={data.actions}
                  />
                )}
              </div>
            </Container>
          )}
        </>
      )}
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
      label: "Margin Top",
      name: "marginTop",
      options: [
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
        { label: "Black", value: "black" },
        { label: "Blue", value: "blue-500" },
        { label: "Orange", value: "orange-500" },
        { label: "White", value: "white" },
      ],
    },
    {
      type: "string",
      label: "Heading Font Size",
      name: "hFontSize",
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Base", value: "text-base" },
        { label: "Large", value: "text-lg" },
        { label: "Extra Large", value: "text-xl" },
        { label: "2XL", value: "text-2xl" },
        { label: "3XL", value: "text-3xl" },
        { label: "4XL", value: "text-4xl" },
        { label: "5XL", value: "text-5xl" },
      ],
    },
    {
      type: "string",
      label: "Text Alignment",
      name: "alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
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
      label: "Container Width",
      name: "width",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
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
  ],
};
