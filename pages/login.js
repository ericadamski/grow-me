import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Wrapper, Button } from "../lib/components/styled/login.styled";
import { login } from "../lib/services/auth";
import Google from '../lib/components/google'

function Login(props) {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      gapi.load("auth2", () => {
        setAuth(
          gapi.auth2.init({
            client_id: props.CLIENT_ID,
            scope: "profile",
          }),
        );
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <Wrapper>
      {auth && (
        <Button
          onClick={() => {
            auth.grantOfflineAccess().then(body =>
              fetch(`${process.env.BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(body),
              }).then(async response => {
                  if (response.status === 200) {
                    const tokens = await response.json();

                    await login({ token });
                  }

                //   TODO: we need to handle the errors nicely here
              }),
            );
          }}
        >
          <Google />Login with Google
        </Button>
      )}
    </Wrapper>
  );
}

Login.getInitialProps = () => {
  return { CLIENT_ID: process.env.GOOGLE_CLIENT_ID };
};

export default Login;
