import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import moment from "moment-timezone"

import Header from "./header"
import "../styles/layout.css"

moment.tz.setDefault("America/New_York")

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          <div style={{ textAlign: `center` }}>
            © {moment().year() || ""}{" "}
            <a href="https://benjaminshen.com">Benjamin Shen</a>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
