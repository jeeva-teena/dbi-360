import type { Collection } from "tinacms";
import { heroBlockSchema } from "../../components/blocks/hero";
import { contentBlockSchema } from "../../components/blocks/content";
import { tabsBlockSchema } from "../../components/blocks/tabs";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { featureBlockSchema } from "../../components/blocks/features";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      if (document._sys.filename === "about") {
        return `/about`;
      }
      if (document._sys.filename === "compliance") {
        return `/compliance`;
      }
      if (document._sys.filename === "aster") {
        return `/aster`;
      }
      if (document._sys.filename === "nexus") {
        return `/nexus`;
      }
      if (document._sys.filename === "buyersflow") {
        return `/buyersflow`;
      }
      if (document._sys.filename === "zyler") {
        return `/zyler`;
      }
      if (document._sys.filename === "confluxHR") {
        return `/confluxHR`;
      }
      if (document._sys.filename === "terms-conditions") {
        return `/terms-conditions`;
      }
      if (document._sys.filename === "blog") {
        return `/blog`;
      }
      return undefined;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        tabsBlockSchema,
        testimonialBlockSchema,
      ],
    },
  ],
};

export default Page;
