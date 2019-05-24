import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";
import Link from "next/link";
import Cookies from "universal-cookie";
import {
  Wrapper,
  Header,
  Button,
  AvatarWrapper,
  AvatarGroup,
  Name,
  Avatar,
} from "./styled/home.styled";
import Ratings from "../lib/components/ratings";

export default class Home extends Component {
  state = { data: null };

  componentDidMount() {
    const cookies = new Cookies();

    if (cookies.get("at") && cookies.get("rt")) {
      fetch(`${process.env.BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          access: cookies.get("at"),
          refresh: cookies.get("rt"),
        }),
      })
        .then(r => r.json())
        .then(data => this.setState({ data }));
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Wrapper>
        <Header>
          <span style={{ flexGrow: 1 }} />
          {data ? (
            <AvatarGroup>
              <Name>Welcome, {data.firstName}</Name>
              <AvatarWrapper>
                <Avatar alt={data.firstName} src={data.picture} />
              </AvatarWrapper>
            </AvatarGroup>
          ) : (
            <Link href="/api/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </Header>
        {data && <Ratings user={data} />}
      </Wrapper>
    );
  }
}
