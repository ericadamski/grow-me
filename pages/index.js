import React, { Component, Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { Rate, Icon } from "antd";
import host from "../lib/services/host";
import { withAuthSync, logout } from "../lib/services/auth";
import {
  Wrapper,
  LogoWrapper,
  Title,
  Explanation,
  WrittenContentWrapper,
  Anchor,
  TryMe,
  Button,
  ContentHeader,
  Content,
  EventContainer,
  EventList,
  Details,
  Detail,
  P,
  Event,
  Focus,
  Outer,
  CreateWrapper,
  CreateOverlay,
  CreateDialog,
  Features,
  Feature,
  FeatureImage,
  FeatureDescription,
  FeatureTitle,
  FeatureDetails,
} from "../lib/components/styled/home.styled";
import { CreateEvent } from "../lib/components/ratings";
import LevelLogo from "../lib/components/level-logo";
import { FeedbackLink } from "../lib/components/ratings/ratings.styled";

class Home extends Component {
  state = { focusing: false, focusedEvent: null, create: false };

  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    if (!token) {
      return { data: {} };
    }

    const redirectOnError = () =>
      !ctx.res
        ? Router.push("/login")
        : ctx.res.writeHead(302, { Location: "/login" }).end();

    const baseUri = !ctx.res
      ? host()
      : `${ctx.req.headers["x-forwarded-proto"]}://${
          ctx.req.headers["x-forwarded-host"]
        }`;

    try {
      const response = await fetch(`${baseUri}/api/user`, {
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
      console.log(error);
      return redirectOnError();
    }
  }

  render() {
    if (Object.keys(this.props.data).length > 1) {
      const overallRating =
        this.props.data.feedback.length > 0
          ? this.props.data.feedback.reduce((s, { feedback }) => {
              if (feedback.length < 1) {
                return s;
              }

              return (
                s +
                feedback.reduce((s, { rating }) => s + rating, 0) /
                  feedback.length
              );
            }, 0) / this.props.data.feedback.length
          : this.props.data.feedback.length;

      return (
        <Outer>
          <Icon
            type="logout"
            style={{
              position: "fixed",
              top: "1rem",
              left: "1rem",
              fontSize: "1.25rem",
              zIndex: 200000,
            }}
            onClick={logout}
          />
          <Wrapper white>
            {this.state.create && (
              <CreateWrapper>
                <CreateOverlay
                  onClick={() => this.setState({ create: false })}
                />
                <CreateDialog>
                  <ContentHeader
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Icon
                      type="close-circle"
                      style={{ fontSize: "1.5rem", marginRight: 20 }}
                      onClick={() => this.setState({ create: false })}
                    />
                    <Title style={{ margin: 0 }}>Request Feedback</Title>
                  </ContentHeader>
                  <CreateEvent
                    user={this.props.data._id}
                    onClick={() =>
                      this.setState({ create: false }, () =>
                        Router.replace("/"),
                      )
                    }
                  />
                </CreateDialog>
              </CreateWrapper>
            )}
            <Content>
              <ContentHeader>
                <a href="https://level.codes/">
                  <LevelLogo color="#6032f2" />
                </a>
                <Title>Hello, {this.props.data.givenName}.</Title>
              </ContentHeader>
              <EventContainer>
                <Details focusing={this.state.focusing}>
                  <Detail>
                    <Title>✨Average</Title>
                    <Rate disabled allowHalf defaultValue={overallRating} />
                  </Detail>
                  <Detail>
                    <Title>🔗Share</Title>
                    <P>
                      Create an event and share it to start getting feedback!
                    </P>
                    <Button onClick={() => this.setState({ create: true })}>
                      Create
                    </Button>
                  </Detail>
                </Details>
                <Title>🎪Events</Title>
                <EventList>
                  {this.props.data.feedback.map(f => (
                    <Event
                      key={f._id}
                      onClick={event => {
                        event.stopPropagation();

                        this.setState({ focusing: true, focusedEvent: f }, () =>
                          document
                            .getElementById("focus")
                            .scrollIntoView({ behavior: "smooth" }),
                        );
                      }}
                    >
                      <span style={{ flexGrow: 1 }}>{f.title || f.name}</span>
                      <Icon type="right" />
                    </Event>
                  ))}
                </EventList>
              </EventContainer>
            </Content>
          </Wrapper>
          <Focus focused={this.state.focusing}>
            {this.state.focusedEvent && (
              <Content>
                <ContentHeader>
                  <Title>
                    <Icon
                      type="arrow-left"
                      style={{
                        fontSize: "1rem",
                        marginRight: "1rem",
                        border: "1px solid black",
                        padding: "0.5rem",
                        borderRadius: "50%",
                      }}
                      onClick={() =>
                        this.setState({ focusing: false }, () =>
                          document.getElementById("main").scrollIntoView({
                            behavior: "smooth",
                            inline: "start",
                          }),
                        )
                      }
                    />
                    {this.state.focusedEvent.name}
                  </Title>
                </ContentHeader>
                <EventContainer>
                  <Title>👂Feedback</Title>
                  <FeedbackLink style={{ marginTop: 20 }} copyable>
                    {this.state.focusedEvent.link}
                  </FeedbackLink>
                  <EventList>
                    {this.state.focusedEvent.feedback.length > 0 ? (
                      this.state.focusedEvent.feedback.map((f, i) => (
                        <Event
                          key={i}
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            pointerEvents: "none",
                          }}
                        >
                          <span style={{ flexGrow: 1, marginBottom: 10 }}>
                            {new Date(f.time).toLocaleString()}
                          </span>
                          {f.comment}
                        </Event>
                      ))
                    ) : (
                      <Title
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                          textAlign: "center",
                        }}
                      >
                        <Icon type="arrow-up" />
                        Share this Link to Get Some Feedback
                      </Title>
                    )}
                  </EventList>
                </EventContainer>
              </Content>
            )}
          </Focus>
        </Outer>
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
            <TryMe>Login / Sign up free</TryMe>
          </Link>
        </WrittenContentWrapper>
        <Features>
          <Feature>
            <FeatureImage>
              <img src="/static/feature-1.png" />
            </FeatureImage>
            <FeatureDetails>
              <FeatureTitle>See where you're at</FeatureTitle>
              <FeatureDescription>
                At a quick glance see your average response, create a new event
                to receive feedback on, or dive into some old feedback to see if
                you have improved.
              </FeatureDescription>
            </FeatureDetails>
          </Feature>
          <Feature>
            <FeatureImage>
              <img src="/static/feature-2.png" />
            </FeatureImage>
            <FeatureDetails>
              <FeatureTitle>Simple way to share</FeatureTitle>
              <FeatureDescription>
                Just pass around your unique event link and people can start
                giving you the feedback you need to be better.
              </FeatureDescription>
            </FeatureDetails>
          </Feature>
          <Feature>
            <FeatureImage>
              <img src="/static/feature-3.png" />
            </FeatureImage>
            <FeatureDetails>
              <FeatureTitle>Review anonymous feedback</FeatureTitle>
              <FeatureDescription>
                All feedback submitted is anonymous, so you can focus on the
                content and people can feel more free to give you useful
                details.
              </FeatureDescription>
            </FeatureDetails>
          </Feature>
        </Features>
        <LogoWrapper href="https://level.codes">
          <LevelLogo color="#6032f2" />
        </LogoWrapper>
      </Wrapper>
    );
  }
}

export default withAuthSync(Home);
