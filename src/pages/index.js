import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PostPreviews from "../components/postPreviews"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostPreviews />
  </Layout>
)

export default IndexPage
