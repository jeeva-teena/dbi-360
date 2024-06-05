import type { Collection } from "tinacms";
import { iconSchema } from "../../components/util/icon";
import ColorPickerInput from "../fields/color";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
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
          type: "object",
          label: "Logo",
          name: "logo",
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
              name: 'imageWidth',
              label: 'Image Size',
              type: 'number',
            },
          ],
         },
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Blue", value: "blue" },
            { label: "Primary", value: "primary" },
            { label: "Orange", value: "orange" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: 'object',
              name: 'submenu',
              label: 'Submenu',
              list: true,
              fields: [
                {
                  type: 'string',
                  name: 'title',
                  label: 'Submenu Title',
                },
                {
                  type: 'string',
                  name: 'link',
                  label: 'Submenu Link',
                },
                {
                  type: 'object',
                  name: 'submenu2',
                  label: 'Submenu 2',
                  list: true,
                  fields: [
                    {
                      type: 'string',
                      name: 'title',
                      label: 'Submenu Title',
                    },
                    {
                      type: 'string',
                      name: 'link',
                      label: 'Submenu Link',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
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
          type: "object",
          label: "Logo",
          name: "footerLogo",
          fields: [
            {
              name: "logoSrc",
              label: "Image Source",
              type: "image",
            },
            {
              name: "logoAlt",
              label: "Alt Text",
              type: "string",
            },
          ],
         },
        {
          type: "object",
          label: "Quick Links",
          name: "quickLinks",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "object",
          label: "Important Links",
          name: "importantLinks",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Orange", value: "orange" },
            { label: "Primary", value: "primary" },
            { label: "Blue", value: "blue" },
          ],
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook",
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter",
            },
            {
              type: "string",
              label: "Instagram",
              name: "instagram",
            },
            {
              type: "string",
              label: "Github",
              name: "github",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Inter",
              value: "inter",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
