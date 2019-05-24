import React, { useEffect } from "react";
import Router from "next/router";
import unfetch from "isomorphic-unfetch";
import Cookies from "universal-cookie";

function GoogleCallback(props) {
  useEffect(() => {
    unfetch(`/api/auth/google/callback?state=${props.state}&code=${props.code}`)
      .then(r => r.json())
      .then(({ access_token, refresh_token }) => {
        const cookies = new Cookies();

        const cookieOptions = {
          path: "/",
          expires: new Date(
            Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 365) * 1000,
          ),
        };

        cookies.set("at", access_token, cookieOptions);
        cookies.set("rt", refresh_token, cookieOptions);

        Router.replace("/");
      });
  }, []);

  return <span>redirecting ...</span>;
}

GoogleCallback.getInitialProps = function getInitialProps({ query }) {
  return { state: query.state, code: query.code };
};

export default GoogleCallback;
