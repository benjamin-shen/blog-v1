import React from "react"
import { graphql } from "gatsby"

import moment from "moment-timezone"
import marked from "marked"
import sanitize from "sanitize-html"

import Layout from "./layout"
import SEO from "./seo"

moment.tz.setDefault("America/New_York")

export const query = graphql`
  query BlogPost($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
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
`

const BlogPost = ({ data }) => {
  const {
    contentfulBlogPost: {
      title,
      date,
      blurb: { blurb },
      content: { content },
      tags,
    },
  } = data
  const convertToHTML = text => {
    if (text) {
      const markdown = marked(text)
      const cleanHTML = sanitize(markdown)
      return { __html: cleanHTML }
    }
    return null
  }
  return (
    <Layout>
      <SEO title={title || "Post"} />
      <div
        style={{ fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` }}
      >
        <h1>{title}</h1>
        <h2 style={{ fontSize: `1em` }}>
          {date && "Written " + new Date(moment(date)).toLocaleDateString()}
        </h2>
        <div
          dangerouslySetInnerHTML={convertToHTML(blurb)}
          style={{ marginTop: `20px` }}
        />
        <div dangerouslySetInnerHTML={convertToHTML(content)} />
      </div>
    </Layout>
  )
}

export default BlogPost
