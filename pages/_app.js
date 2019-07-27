import React from "react";
import {NextSeo} from "next-seo";
import App, { Container } from "next/app";
import { createGlobalStyle } from "styled-components";
import Colors from "../utils/colors";

const GlobalStyles = createGlobalStyle`
  html,body {
    font-family: 'Roboto', sans-serif;

    *::selection {
      background: ${Colors.green}; /* WebKit/Blink Browsers */
    }

    *::-moz-selection {
      background: ${Colors.green}; /* Gecko Browsers */
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
        <GlobalStyles />
        <NextSeo
          config={{
            title: "💗Grow Me",
            description:
              "A small application that helps you get anonymous feedback to become a better person.",
            openGraph: {
              url: "https://grow-me.level.codes",
              title: "💗Grow Me",
              description:
                "A small application that helps you get anonymous feedback to become a better person.",
              images: [
                {
                  url: "https://grow-me.now.sh/static/favicon.jpg",
                  width: 640,
                  height: 640,
                  alt: "beating heart emoticon",
                },
              ],
            },
            twitter: {
              handle: "@levelcodes",
              site: "@levelcodes",
              cardType: "summary_large_image",
              image: {
                url: "https://grow-me.now.sh/static/favicon.jpg",
                width: 640,
                height: 640,
                alt: "beating heart emoticon",
              },
            },
          }}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}
