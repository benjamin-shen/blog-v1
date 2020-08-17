import React from "react"
import { navigate } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

import moment from "moment-timezone"

import { convertToHTML, getReadTime } from "./blogPost"
import "../styles/postPreviews.css"

const getData = graphql`
  query PostPreview {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
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

const PostPreviews = () => {
  const data = useStaticQuery(getData)
  const {
    allContentfulBlogPost: { nodes },
  } = data

  return (
    <div className="post-previews">
      <h1>Recent Posts</h1>
      <div>
        {nodes.map(node => {
          const {
            slug,
            title,
            date,
            blurb: { blurb },
            content: { content },
            tags,
          } = node

          const blurbHTML = convertToHTML(blurb)
          const contentHTML = convertToHTML(content)
          const readTime = getReadTime(blurbHTML.__html + contentHTML.__html)
          return (
            <div
              role="button"
              className="post-preview bg-light hoverable"
              onClick={() => {
                navigate("/posts/" + slug)
              }}
              onKeyPress={() => {
                navigate("/posts/" + slug)
              }}
              tabIndex="0"
            >
              <h2 style={{ fontSize: `1.6em`, marginBottom: `10px` }}>
                {title}
              </h2>
              <p style={{ fontSize: `1em`, marginBottom: 0 }}>
                {date && "Date: " + new Date(moment(date)).toLocaleDateString()}
              </p>
              <p style={{ fontSize: `1em`, marginBottom: `10px` }}>
                {readTime && "Read time: " + readTime}
              </p>
              <div
                dangerouslySetInnerHTML={blurbHTML}
                style={{ fontSize: `1em`, marginBottom: 0 }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostPreviews
