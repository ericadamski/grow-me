import React, { Component } from "react";
import Router from "next/router";
import Link from 'next/link';
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { withAuthSync } from "../lib/services/auth";
import {
  Wrapper,
  LogoWrapper,
  Title,
  Explanation,
  WrittenContentWrapper,
  Anchor,
  TryMe,
  Header,
  Button,
  AvatarWrapper,
  AvatarGroup,
  Name,
  Avatar,
} from "../lib/components/styled/home.styled";
import Ratings from "../lib/components/ratings";
import Modal from "../lib/components/modal";
import LevelLogo from "../lib/components/level-logo";

class Home extends Component {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    const redirectOnError = () =>
      !ctx.res
        ? Router.push("/")
        : ctx.res.writeHead(302, { Location: "/login" }).end();

    try {
      const response = await fetch(`${process.env.BASE_URL}/api/user`, {
        credentials: "include",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();

        return { data };
      } else {
        return await redirectOnError();
      }
    } catch (error) {
      return redirectOnError();
    }
  }

  render() {
    if (Object.keys(this.props.data).length > 1) {
      return (
        <Wrapper>I am logged in {JSON.stringify(this.props.data)}</Wrapper>
      );
    }

    return (
      <Wrapper>
        <WrittenContentWrapper>
          <Title>💗</Title>
          <Title style={{ marginBottom: 20 }}>Grow Me</Title>
          <Explanation>
            Grow Me is an extremely small application used to get anonymous
            feedback to help you improve. Written for use at{" "}
            <Anchor href="https://level.codes">level.codes</Anchor> we think
            that it is an amazingly simple way to get the feedback you need to
            become a better person.
          </Explanation>
          <Link href="/login">
            <TryMe>Sign Up Free</TryMe>
          </Link>
        </WrittenContentWrapper>
        <LogoWrapper href="https://level.codes">
          <LevelLogo />
        </LogoWrapper>
      </Wrapper>
    );
  }
}

export default withAuthSync(Home);
