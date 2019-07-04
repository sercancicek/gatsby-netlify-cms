import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'


const IndexPage = () => {
const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                        }
                    }
                }
            }
        }
    `)
    console.log({ xx: data.allMarkdownRemark });
    return (
        <Layout>
            <h1>Hello.</h1>
            <h2>I'm Andrew, a full-stack developer living in beautiful Philadelphia.</h2>
            <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
        </Layout>
    )
}

export default IndexPage