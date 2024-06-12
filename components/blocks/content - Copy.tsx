import React from "react";
import { Container } from "../util/container";
import { useTheme } from "../layout";
import { useCMS } from "tinacms";
import { Section } from "../util/section";
import {
  TinaMarkdown,
  TinaMarkdownContent,
  Components,
} from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
const components: Components<{
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
}> = {
  NewsletterSignup: (props) => (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div>
          <TinaMarkdown content={props.children} />
        </div>
        <div className="mt-8">
          <form className="sm:flex">
            <label className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
              placeholder={props.placeholder}
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {props.buttonText}
              </button>
            </div>
          </form>
          {props.disclaimer && (
            <div className="mt-3 text-sm text-gray-500">
              <TinaMarkdown content={props.disclaimer} />
            </div>
          )}
        </div>
      </div>
    </div>
  ),
};
export const Content = ({ data }: { data: PageBlocksContent }) => {
  const theme = useTheme();
  const cms = useCMS();

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
              <TinaMarkdown components={components} content={data.body} />
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
              <TinaMarkdown components={components} content={data.body} />
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
      body: "",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me",
            },
          },
        },
      ],
      isBody: true,
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
  ],
};
