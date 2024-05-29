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
  const bgContainerStyle = {
    backgroundImage: `url(${backgroundImageSrc})`,
    backgroundSize: `cover`,
    backgroundPosition: `center center`,
    backgroundRepeat: `no-repeat`,
    height: `300px`,
  };

  return (
    <Section
      color={data.color}
      bgimg={data.bgOption === "section" ? backgroundImageSrc : ""}
    >
      {data.imgSrc && (
        <div data-tina-field={tinaField(data.imgSrc, "src")}>
          <img src={data.imgSrc.src} aria-hidden="true" />
        </div>
      )}
      {!data.imgSrc && (
        <>
          {data.bgOption === "container" ? (
            <Container
              width={data.width}
              bgimg={backgroundImageSrc}
              className={`prose py-24 my-12 rounded-lg 
              ${
                data.color === "primary"
                  ? `prose-primary`
                  : data.color === "orange"
                  ? `prose-orange`
                  : `dark:prose-dark`
              }
             `}
              data-tina-field={tinaField(data, "body")}
              size="medium"
              style={{
                textAlign: data.alignment || "left",
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
              className={`prose ${
                data.color === "primary"
                  ? `prose-primary`
                  : data.color === "orange"
                  ? `prose-orange`
                  : `dark:prose-dark`
              }`}
              data-tina-field={tinaField(data, "body")}
              size="large"
              style={{ textAlign: data.alignment || "left" }}
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
      label: "Text Color",
      name: "textColor",
      options: [
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
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
      type: "string",
      label: "Background Image Option",
      name: "bgOption",
      options: [
        { label: "Container", value: "container" },
        { label: "Section", value: "section" },
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
