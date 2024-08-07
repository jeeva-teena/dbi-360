import { Post } from "../../components/posts/post";
import { client } from "../../tina/__generated__/databaseClient";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { GetStaticProps } from "next";

const replaceUndefinedWithNull = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(replaceUndefinedWithNull);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value === undefined ? null : replaceUndefinedWithNull(value);
      return acc;
    }, {} as any);
  }
  return obj;
};

type Params = {
  filename: string;
};

// Use the props returned by get static props
export default function BlogPostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.post) {
    return (
      <Layout rawData={data} data={data.global}>
        <Post {...data.post} />
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.blogPostQuery({
    relativePath: `${(params as Params).filename}.mdx`,
  });
  const sanitizedProps = replaceUndefinedWithNull(tinaProps);

  // if (!tinaProps.data.post?._body?.children[6]?.children[0]?.alt === undefined) {
  //   tinaProps.data.post._body.children[6].children[0].alt = null; // Set to null if undefined
  // }

  return {
    props: {
      ...sanitizedProps,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  };
};

export type PostType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["post"];
