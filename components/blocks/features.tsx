import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
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
          className="text-2xl font-semibold title-font"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <p
          data-tina-field={tinaField(data, "text")}
          className="text-base opacity-80 leading-relaxed"
        >
          {data.text}
        </p>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section color={data.color}>
      <Container
        className={` py-24 my-12`}
        size="large"
      >
        <div className="prose text-center max-w-full">
          <TinaMarkdown content={data.body} />
        </div>
        <div className="flex flex-wrap gap-4 text-left mt-12">
          {data.items &&
            data.items.map(function (block, i) {
              return (
                <Feature featuresColor={data.color} key={i} data={block} />
              );
            })}
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
        defaultItem: {
          ...defaultFeature,
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
  ],
};
