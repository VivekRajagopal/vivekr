import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { Page } from "../../components/Page";

type Blog = {
  date: string;
  path: string;
  title: string;
};

type PageQueryResult = {
  blog: {
    posts: { frontmatter: Blog }[];
  };
};

const BlogEntry = (blog: Blog) => (
  <tr>
    <td>{new Date(blog.date).toLocaleDateString()}</td>
    <td>
      <Link to={blog.path}>{blog.title}</Link>
    </td>
  </tr>
);

const pageQuery = graphql`
  query BlogsQuery {
    blog: allMdx(
      filter: { frontmatter: { path: { regex: "/blog/.+/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      posts: nodes {
        frontmatter {
          title
          path
          date
        }
      }
    }
  }
`;

const BlogPage = () => {
  const { blog } = useStaticQuery<PageQueryResult>(pageQuery);

  return (
    <Page>
      <h1>Vivek Rajagopal</h1>
      <table>
        <thead></thead>
        <tbody>{blog.posts.map(({ frontmatter }) => BlogEntry(frontmatter))}</tbody>
      </table>
    </Page>
  );
};

export default BlogPage;
