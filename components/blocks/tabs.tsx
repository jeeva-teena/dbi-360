import React, { useState } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksTabs } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Tabs = ({ data }: { data: PageBlocksTabs }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <Section color={data.color} className={`${data.sPadding}`}>
      <Container
        className={`prose my-12 ${data.cPadding} ${
          data.color === "primary"
            ? `prose-primary`
            : data.color === "orange"
            ? `prose-orange`
            : `dark:prose-dark`
        }`}
        size={data.size}
      >
        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 place-content-between items-center">
          <div className="image-container text-center mt-5">
            {data.tabsImage1 && (
              <div data-tina-field={tinaField(data.tabsImage1, "src")}>
                <img
                  src={data.tabsImage1.src}
                  aria-hidden="true"
                  className={activeTab === 1 ? "active mx-auto" : "mx-auto"}
                />
              </div>
            )}
            {data.tabsImage2 && (
              <div data-tina-field={tinaField(data.tabsImage2, "src")}>
                <img
                  src={data.tabsImage2.src}
                  aria-hidden="true"
                  className={activeTab === 2 ? "active" : ""}
                />
              </div>
            )}
            {data.tabsImage3 && (
              <div data-tina-field={tinaField(data.tabsImage3, "src")}>
                <img
                  src={data.tabsImage3.src}
                  aria-hidden="true"
                  className={activeTab === 3 ? "active" : ""}
                />
              </div>
            )}
          </div>
          <div className="lg:ps-24 col-span-2">
            <div className="bg-gray-200 flex items-center rounded-lg cursor-pointer md:text-sm text-xs text-black text-center">
              <div
                className={`tab lg:px-5 px-4 py-4 w-1/3 rounded-lg ${
                  activeTab === 1 ? "active" : ""
                }`}
                onClick={() => handleTabClick(1)}
              >
                Extensive Business Research
              </div>
              <div
                className={`tab lg:px-5 px-4 py-4 w-1/3 rounded-lg ${
                  activeTab === 2 ? "active" : ""
                }`}
                onClick={() => handleTabClick(2)}
              >
                Business Data Management
              </div>
              <div
                className={`tab lg:px-5 px-4 py-4 w-1/3 rounded-lg ${
                  activeTab === 3 ? "active" : ""
                }`}
                onClick={() => handleTabClick(3)}
              >
                Searching & Converting
              </div>
            </div>
            <div className="content-container mt-5">
              <div className={activeTab === 1 ? "active" : ""}>
                <h3>Extensive Business Research </h3>
                <p>
                  Conduct extensive research on People, Products, and Companies,
                  taking advantage of a wide array of relevant filters.
                </p>
              </div>
              <div className={activeTab === 2 ? "active" : ""}>
                <h3>Business Data Management</h3>
                <p>
                  Experience real-time business data management with a fully
                  integrated ERP system, promoting seamless business operations
                  across various departments.
                </p>
              </div>
              <div className={activeTab === 3 ? "active" : ""}>
                <h3>Searching & Converting</h3>
                <p>
                  Explore a plethora of COMPANIES, PEOPLE, and PRODUCTS across
                  varied industries, round the globe. Reach out directly to your
                  prospects & convert them into real customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const tabsBlockSchema: TinaTemplate = {
  name: "tabs",
  label: "Tabs",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "",
    },
  },
  fields: [
    {
      type: "object",
      label: "Upload Image 1",
      name: "tabsImage1",
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
      type: "object",
      label: "Upload Image 2",
      name: "tabsImage2",
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
      type: "object",
      label: "Upload Image 3",
      name: "tabsImage3",
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
