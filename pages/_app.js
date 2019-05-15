import React from "react";
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
        <Component {...pageProps} />
      </Container>
    );
  }
}
