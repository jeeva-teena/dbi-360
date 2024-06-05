import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { Actions } from "../util/actions";
import Link from "next/link";
import { iconSchema } from "../util/icon";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Feature = ({
  featuresColor,
  className,
  data,
}: {
  featuresColor: string;
  className: string;
  data: PageBlocksFeaturesItems;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className={`w-full flex-1 flex flex-col gap-6 p-4 rounded-xl items-center lg:items-start ${className}`}
      style={{ border: "1px solid #ccc" }}
    >
      <a href={data.href} className="block w-full" target="_blank">
        {data.icon && (
          <Icon
            tinaField={tinaField(data, "icon")}
            parentColor={featuresColor}
            data={{ size: "large", ...data.icon }}
          />
        )}
        {data.imgSrc && (
          <div data-tina-field={tinaField(data.imgSrc, "src")}>
            <img
              src={data.imgSrc.src}
              aria-hidden="true"
              className={`${data.imgSrc.imgSize} ${data.imgSrc.imgWidth} ${data.imgSrc.imgHeight} ${data.imgSrc.imgPosition}`}
            />
            <hr className="my-6" />
          </div>
        )}
        {data.title && (
          <h3
            data-tina-field={tinaField(data, "title")}
            className={`font-semibold title-font  ${data.featureTextColor} ${data.itemAlignment} ${data.hFontSize}`}
          >
            {data.title}
          </h3>
        )}
        {data.text && (
          <p
            data-tina-field={tinaField(data, "text")}
            className={`opacity-80 leading-relaxed  ${data.featureTextColor} ${data.itemAlignment} ${data.dFontSize}`}
          >
            {data.text}
          </p>
        )}
      </a>
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  const { color, body, items, gridColumns } = data;

  const gridTemplateColumns = `repeat(${gridColumns}, minmax(0, 1fr))`;

  const backgroundImageSrc = data.bgimg?.src || "";

  return (
    <Section
      color={color}
      bgimg={data.bgimg?.bgOption === "section" ? backgroundImageSrc : ""}
      className={`${data.bgimg?.backgroundSize} ${data.sPadding} ${data.bgimg?.backgroundPosition} ${data.bgimg?.backgroundRepeat}`}
    >
      <Container
        size={data.size}
        className={`${data.cPadding} ${data.bgimg?.backgroundRepeat} ${data.bgimg?.backgroundPosition} ${data.bgimg?.backgroundSize}`}
        bgimg={data.bgimg?.bgOption === "container" ? backgroundImageSrc : ""}
      >
        <div className={`prose w-full mx-auto ${data.alignment} ${data.textColor}`}>
          <TinaMarkdown content={body} />
        </div>
        <div
          className={`grid gap-4 text-left mt-12`}
          style={{ gridTemplateColumns }}
        >
          {items &&
            items.map(function (block, i) {
              return (
                <Feature
                  featuresColor={color}
                  key={i}
                  data={block}
                  className={`${data.bgColor}`}
                />
              );
            })}
        </div>
        <div>
          {data.actions && (
            <Actions
              className="justify-center py-2 mt-14"
              parentColor={data.color}
              actions={data.actions}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
      },
      fields: [
        iconSchema,
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
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea",
          },
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
          ],
        },
        {
          type: "string",
          label: "Description Font Size",
          name: "dFontSize",
          options: [
            { label: "Small", value: "text-sm" },
            { label: "Base", value: "text-base" },
            { label: "Large", value: "text-lg" },
            { label: "Extra Large", value: "text-xl" },
            { label: "2XL", value: "text-2xl" },
            { label: "3XL", value: "text-3xl" },
          ],
        },
        {
          type: "string",
          label: "Text Color",
          name: "featureTextColor",
          options: [
            { label: "Black", value: "text-black" },
            { label: "Blue", value: "text-blue-500" },
            { label: "Orange", value: "text-orange-500" },
            { label: "White", value: "text-white" },
          ],
        },
        {
          type: "string",
          label: "Text Alignment",
          name: "itemAlignment",
          options: [
            { label: "Left", value: "text-left" },
            { label: "Center", value: "text-center" },
            { label: "Right", value: "text-right" },
            { label: "Justify", value: "text-justify" },
          ],
        },
        {
          type: "string",
          label: "Link",
          name: "href",
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "bgColor",
      options: [
        { label: "White", value: "bg-white" },
        { label: "Transparent", value: "bg-transparent" },
        { label: "Black", value: "bg-black" },
      ],
    },
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
        { label: "Black", value: "text-black" },
        { label: "Blue", value: "text-blue-500" },
        { label: "Orange", value: "text-orange-500" },
        { label: "White", value: "text-white" },
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
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
        { label: "Orange", value: "orange" },
      ],
    },
    {
      type: "string",
      label: "Grid Columns",
      name: "gridColumns",
      ui: {
        component: "select",
      },
      options: [
        { label: "1 Column", value: "1" },
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
        { label: "6 Columns", value: "6" },
        { label: "7 Columns", value: "7" },
        { label: "8 Columns", value: "8" },
        { label: "9 Columns", value: "9" },
        { label: "10 Columns", value: "10" },
        { label: "11 Columns", value: "11" },
        { label: "12 Columns", value: "12" },
      ],
      defaultItem: undefined,
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
        { label: "py-10", value: "py-10" },
        { label: "py-14", value: "py-14" },
        { label: "py-16", value: "py-16" },
        { label: "py-20", value: "py-20" },
        { label: "py-24", value: "py-24" },
        { label: "py-28", value: "py-28" },
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
