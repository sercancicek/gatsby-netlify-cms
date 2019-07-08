import React from 'react'
import Layout from '../components/layout';
import { graphql } from 'gatsby';

export const query = graphql`
  query (
    $slug: String!
    $type: String!
  ) {
    markdownRemark (
      fields:
      {
        slug: { eq: $slug }
        type: { eq: $type }
      }
    ) {
      frontmatter {
        h1
        h2
        p
      }
      html
    }
  }
`

const IndexComponent = ({ data }) => {

  return (
    <Layout>
      <h1>
        {data.markdownRemark.frontmatter.h1}
      </h1>
      <h2>
        {data.markdownRemark.frontmatter.h2}
      </h2>
      <p>
        {data.markdownRemark.frontmatter.p}
      </p>
    </Layout>
  )
}

export default IndexComponent