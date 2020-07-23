/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
          title
          date
          blurb {
            blurb
          }
          content {
            content
          }
          tags
        }
      }
    }
  `)

  data.allContentfulBlogPost.nodes.forEach(node => {
    const { slug } = node
    actions.createPage({
      path:
        "posts/" +
        // https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
        slug
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, ""),
      component: require.resolve(`./src/components/blogPost.js`),
      context: {
        slug,
      },
    })
  })
}
