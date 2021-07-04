import { UserProvider } from '@auth0/nextjs-auth0';
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { AppContext } from 'next/app';
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import 'plyr-react/dist/plyr.css';
import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from 'react-toast-notifications';
import { RecoilRoot } from 'recoil';
import PageChange from "../components/PageChange/PageChange";
import "../styles/custom.css";
import "../styles/tailwind.css";
import { constants } from "../util/constants";

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
  static async getInitialProps({ Component, router, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component['layout'] || (({ children }) => <>{children}</>);
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
