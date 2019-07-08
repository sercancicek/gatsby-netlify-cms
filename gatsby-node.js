const path = require('path')

module.exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    const fileNode = getNode(node.parent)
    const parsedFilePath = fileNode && path.parse(fileNode.relativePath)

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')
        const parentNode = getNode(node.parent)
        const type = path.parse(parentNode.relativePath).dir
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
        createNodeField({
            node,
            name: 'type',
            value: type,
          })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/blog.js')
  const indexTemplate = path.resolve('./src/templates/index.js')
  const res = await graphql(`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
            type
          }
        }
      }
    }
  }
  `)
  res.data.allMarkdownRemark.edges.forEach(edge => {
    if (edge.node.fields.type === 'posts') {
      createPage({
        component: blogTemplate,
        path: `/blog/${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
          type: edge.node.fields.type,
        }
      })
    } else if (edge.node.fields.type === 'homeMD') {
      createPage({
        component: indexTemplate,
        path: `/`,
        context: {
          slug: edge.node.fields.slug,
          type: edge.node.fields.type,
        }
      })
    }
  })

}