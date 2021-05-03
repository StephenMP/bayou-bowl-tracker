import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { UserProvider } from '@auth0/nextjs-auth0';
import { ToastProvider } from 'react-toast-notifications';
import PageChange from "components/PageChange/PageChange.js";
import { constants } from "../util/constants"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import { RecoilRoot } from 'recoil';

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});

Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);
    const pageTitle = constants.ENVIRONMENT === 'PRODUCTION' ? constants.APP_NAME : `TEST - ${constants.APP_NAME}`

    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>{pageTitle}</title>
        </Head>
        <RecoilRoot>
          <UserProvider>
            <ToastProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </UserProvider>
        </RecoilRoot>
      </React.Fragment>
    );
  }
}
