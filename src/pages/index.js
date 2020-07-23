import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PostPreview from "../components/postPreview"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostPreview />
    <Link to="posts/cornell-dining-reservation-system">Go to post</Link>
  </Layout>
)

export default IndexPage
