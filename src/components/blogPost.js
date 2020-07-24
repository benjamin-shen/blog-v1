import React from "react"
import { graphql } from "gatsby"

import moment from "moment-timezone"
import marked from "marked"
import sanitize from "sanitize-html"
import readTimeEstimate from "read-time-estimate"

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
      const cleanHTML = sanitize(markdown, {
        allowedTags: sanitize.defaults.allowedTags.concat(["h2", "img"]),
        allowedAttributes: {
          a: ["href", "name", "target"],
          img: ["src"],
        },
      })
      return { __html: cleanHTML }
    }
    return null
  }

  const blurbHTML = convertToHTML(blurb)
  const contentHTML = convertToHTML(content)
  const { humanizedDuration } = readTimeEstimate(
    blurbHTML.__html + contentHTML.__html,
    275,
    12,
    500,
    ["img"]
  )
  return (
    <Layout>
      <SEO title={title || "Post"} />
      <div
        style={{ fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` }}
      >
        <h1>{title}</h1>
        <p style={{ fontSize: `1em`, marginBottom: 0 }}>
          {date && "Date: " + new Date(moment(date)).toLocaleDateString()}
        </p>
        <p style={{ fontSize: `1em` }}>
          {humanizedDuration && "Read time: " + humanizedDuration}
        </p>
        <div
          dangerouslySetInnerHTML={blurbHTML}
          style={{ marginTop: `20px` }}
        />
        <div dangerouslySetInnerHTML={contentHTML} />
      </div>
    </Layout>
  )
}

export default BlogPost
