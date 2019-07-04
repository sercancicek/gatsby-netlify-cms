const path = require('path')

module.exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    const fileNode = getNode(node.parent)
    const parsedFilePath = fileNode && path.parse(fileNode.relativePath)

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')
        if (
            // home page gets root slug
            parsedFilePath && parsedFilePath.name === 'home' &&
            parsedFilePath.dir === 'pages'
          ) {
            slug = `/`
          }
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })
}