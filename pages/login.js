import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Icon } from "antd";
import "antd/dist/antd.css";
import {
  Wrapper,
  Button,
  ButtonInner,
  LogoWrapper,
} from "../lib/components/styled/login.styled";
import { login } from "../lib/services/auth";
import host from "../lib/services/host";
import Google from "../lib/components/google";
import LevelLogo from "../lib/components/level-logo";

export default function Login() {
  const [auth, setAuth] = useState();
  const [authing, setAuthing] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      gapi.load("auth2", () => {
        setAuth(
          gapi.auth2.init({
            client_id: process.env.CLIENT_ID,
            scope: "profile",
          }),
        );
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <Wrapper>
      {auth && !authing ? (
        <Button
          onClick={() => {
            setAuthing(true);

            auth.grantOfflineAccess().then(body =>
              fetch(`${host()}/api/login`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(body),
              }).then(async response => {
                console.log(response);
                if (response.ok) {
                  const token = await response.json();

                  await login({ token });
                }
                //   TODO: we need to handle the errors nicely here
              }),
            );
          }}
        >
          <ButtonInner>
            <Google />
            Login/Sign Up with Google
          </ButtonInner>
        </Button>
      ) : (
        <Icon spin type="loading" style={{ fontSize: "16px", color: "#FFF" }} />
      )}
      <LogoWrapper href="https://level.codes/">
        <LevelLogo />
      </LogoWrapper>
    </Wrapper>
  );
}
