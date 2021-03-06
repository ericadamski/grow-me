// #region imports
import React, { useState, useRef, Fragment } from "react";
import fetch from "isomorphic-unfetch";
import hash from "string-hash";
import "antd/dist/antd.css";
import {
  Statistic,
  Icon,
  Empty,
  List,
  Rate,
  Card,
  Divider,
  notification,
  Input,
} from "antd";
import {
  Wrapper,
  Section,
  Title,
  NoFeedback,
  FeedbackLink,
  Event,
  EventName,
  EventDetails,
} from "./ratings.styled";
import host from "../../services/host";
// #endregion imports

export function CreateEvent(props) {
  const [link, setLink] = useState({
    name: null,
    title: null,
    link: "Type above to get a link",
  });
  const details = useRef(null);

  return (
    <Event>
      <Input
        placeholder="Title (only for you)"
        type="text"
        onInput={event => {
          setLink({ ...link, title: event.target.value });
        }}
      />
      <br />
      <br />I would like to receive feedback for,{" "}
      <EventName
        onInput={event => {
          const h = hash(event.target.innerHTML) + Date.now();

          setLink({
            ...link,
            name: event.target.innerHTML,
            reference: h,
            link: `${host()}/f/${h}`,
          });
        }}
      />
      <EventDetails
        ref={details}
        placeholder="Give more context on what you want feedback for. The more specific you can be, the more valuable the feedback. (This will be shown to the reviewer)"
      />
      <span
        onClick={() => {
          const description = details.current.value;

          notification.success({
            message: "Link Successfully Copied!",
            description:
              "You can now send the link to whom ever you would like and then come back here to check if you've recieved any feedback.",
            icon: <p>🚀</p>,
          });

          props.onClick && props.onClick();

          fetch(`${host()}/api/event`, {
            credentials: "include",
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              description,
              name: link.name,
              title: link.title,
              userId: props.user,
              reference: link.reference,
              link: link.link,
            }),
          });
        }}
      >
        <FeedbackLink copyable>{link.link}</FeedbackLink>
      </span>
    </Event>
  );
}

export default function Ratings(props) {
  const overallRating =
    props.user.feedback.length > 0
      ? props.user.feedback.reduce((s, { feedback }) => {
          if (feedback.length < 1) {
            return s;
          }

          return (
            s +
            feedback.reduce((s, { rating }) => s + rating, 0) / feedback.length
          );
        }, 0) / props.user.feedback.length
      : props.user.feedback.length;

  console.log(overallRating);

  return (
    <Wrapper>
      {!props.user.feedback || props.user.feedback.length < 1 ? (
        <Section>
          <NoFeedback>
            You currently have no feedback <span role="img">🤔</span>, get some!
            <CreateEvent user={props.user._id} />
          </NoFeedback>
        </Section>
      ) : (
        <Fragment>
          <Section>
            <NoFeedback>
              <CreateEvent user={props.user._id} />
            </NoFeedback>
            <Divider />
            <Title>Overall</Title>
            <Rate disabled allowHalf defaultValue={overallRating} />
          </Section>
          <Section>
            <Title>Feedback</Title>
            {props.user.feedback.map(event => {
              event.overallRating =
                event.feedback.length > 0
                  ? event.feedback.reduce((s, { rating }) => s + rating, 0) /
                    event.feedback.length
                  : event.feedback.length;

              return (
                <Card
                  hoverable
                  style={{ margin: "1rem 0" }}
                  key={event.name}
                  title={event.name}
                  extra={
                    <Fragment>
                      <Statistic
                        title="Improvment"
                        value={Math.abs(overallRating - event.overallRating)}
                        precision={2}
                        valueStyle={{
                          color: `${
                            overallRating - event.overallRating <= 0
                              ? "#96F550"
                              : "#D35269"
                          }`,
                        }}
                        prefix={
                          <Icon
                            type={`arrow-${
                              overallRating - event.overallRating > 0
                                ? "down"
                                : "up"
                            }`}
                          />
                        }
                        suffix="%"
                      />
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={event.overallRating}
                      />
                    </Fragment>
                  }
                >
                  <FeedbackLink copyable>{event.link}</FeedbackLink>
                  <p style={{ whiteSpace: "pre-wrap" }}>{event.description}</p>
                  <Divider />
                  <List
                    dataSource={event.feedback}
                    renderItem={item => {
                      return (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <Fragment>
                                {new Date(item.time).toLocaleString({
                                  month: "short",
                                  day: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                <Rate
                                  style={{ marginLeft: "1rem" }}
                                  disabled
                                  allowHalf
                                  defaultValue={item.rating}
                                />
                              </Fragment>
                            }
                            description={
                              <p style={{ whiteSpace: "pre-wrap" }}>
                                {item.comment}
                              </p>
                            }
                          />
                        </List.Item>
                      );
                    }}
                    locale={{
                      emptyText: <Empty description="No Feedback Yet 🤷‍♀️" />,
                    }}
                  />
                </Card>
              );
            })}
          </Section>
        </Fragment>
      )}
    </Wrapper>
  );
}
