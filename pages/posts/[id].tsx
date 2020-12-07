import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
}

interface PostData {
  title: string
  date: string
  contentHtml: string
}

interface PostProps {
  postData: PostData;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
