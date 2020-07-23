import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import marked from "marked"

const getData = graphql`
  query PostPreview {
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
`

const PostPreview = () => {
  const data = useStaticQuery(getData)
  const {
    allContentfulBlogPost: {
      nodes: { slug },
    },
  } = data

  return (
    <div>
      <h1>Post Preview</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}

export default PostPreview
