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
  data,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="flex-1 flex flex-col gap-6 text-center p-4 rounded-xl items-center lg:items-start lg:text-left max-w-xl mx-auto"
      style={{ flexBasis: "16rem", border: "1px solid #ccc" }}
    >
      <a href={data.href}>
        {data.icon && (
          <Icon
            tinaField={tinaField(data, "icon")}
            parentColor={featuresColor}
            data={{ size: "large", ...data.icon }}
          />
        )}
        {data.imgSrc && (
          <div data-tina-field={tinaField(data.imgSrc, "src")}>
            <img src={data.imgSrc.src} aria-hidden="true" />
            <hr className="mt-6" />
          </div>
        )}
        {data.title && (
          <h3
            data-tina-field={tinaField(data, "title")}
            className={`font-semibold title-font ${data.hFontSize}`}
          >
            {data.title}
          </h3>
        )}
        {data.text && (
          <p
            data-tina-field={tinaField(data, "text")}
            className={`opacity-80  leading-relaxed ${data.dFontSize}`}
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

  return (
    <Section color={color}>
      <Container className={` py-24 my-12`} size="large">
        <div className="prose text-center max-w-full">
          <TinaMarkdown content={body} />
        </div>
        <div
          className={`grid gap-4 text-left mt-12`}
          style={{ gridTemplateColumns }}
        >
          {items &&
            items.map(function (block, i) {
              return <Feature featuresColor={color} key={i} data={block} />;
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
          label: "Link",
          name: "href",
        },
      ],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
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
