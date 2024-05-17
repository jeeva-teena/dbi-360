import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksBackground } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Background = ({ data }: { data: PageBlocksBackground }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : data.color === "orange" ? `prose-orange` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={data.body} />
      </Container>
    </Section>
  );
};

export const backgroundBlockSchema: TinaTemplate = {
  name: "background",
  label: "Background",
  ui: {
    previewSrc: "/blocks/background.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
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
