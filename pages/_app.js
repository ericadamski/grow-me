import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import App, { Container } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,body {
    font-family: 'Roboto', sans-serif;

    *::selection {
      background: #6032f2; /* WebKit/Blink Browsers */
    }

    *::-moz-selection {
      background: #6032f2; /* Gecko Browsers */
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
    margin: 0;
    padding: 0;
  }
`;

export default class GrowApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#6032f2" />
        </Head>
        <GlobalStyles />
        <NextSeo
          title="Grow Me"
          description="A small application that helps you get anonymous feedback to become a better person."
          openGraph={{
            url: "https://grow-me.level.codes",
            title: "Grow Me",
            description:
              "A small application that helps you get anonymous feedback to become a better person.",
            images: [
              {
                url: "https://grow-me.now.sh/static/favicon.png",
                width: 640,
                height: 640,
                alt: "beating heart emoticon",
              },
            ],
          }}
          twitter={{
            handle: "@levelcodes",
            site: "@levelcodes",
            cardType: "summary_large_image",
            image: {
              url: "https://grow-me.now.sh/static/favicon.png",
              width: 640,
              height: 640,
              alt: "beating heart emoticon",
            },
          }}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}
