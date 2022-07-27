import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import '../styles/custom.css'
import '../styles/tailwind.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Thanks for the amazing journey!" />
          <title>Thank You</title>
          {process.env.NODE_ENV === 'production' && (
            <script defer src="https://app.watchthem.live/pixel/yXsvYNKQz4XEPzHj"></script>
          )}
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    )
  }
}
