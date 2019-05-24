// #region imports
import React, { useState, useRef, Fragment } from "react";
import fetch from "isomorphic-unfetch";
import hash from "string-hash";
import { Rate, Card, Divider } from "antd";
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
import "antd/dist/antd.css";
// #endregion imports

export default function Ratings(props) {
  const [link, setLink] = useState({
    title: null,
    reference: "Type above to get a link",
  });
  const details = useRef(null);

  return (
    <Wrapper>
      {!props.user.feedback || props.user.feedback.length < 1 ? (
        <Section>
          <NoFeedback>
            You currently have no feedback <span role="img">🤔</span>, get some!
            <Event>
              I would like to receive feedback for,{" "}
              <EventName
                onInput={event => {
                  setLink({
                    title: event.target.innerHTML,
                    reference: `https://grow-me.now.sh/f/${hash(
                      event.target.innerHTML,
                    ) + Date.now()}`,
                  });
                }}
              />
              <EventDetails
                ref={details}
                placeholder="Give more context on what you want feedback for. The more specific you can be, the more valuable the feedback."
              />
              <span
                onClick={() => {
                  const description = details.current.value;

                  fetch(`${process.env.BASE_URL}/api/event`, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      description,
                      name: link.title,
                      userId: props.user._id,
                      reference: link.reference,
                    }),
                  });
                }}
              >
                <FeedbackLink copyable>{link.reference}</FeedbackLink>
              </span>
            </Event>
          </NoFeedback>
        </Section>
      ) : (
        <Fragment>
          <Section>
            <NoFeedback>
              <Event>
                I would like to receive feedback for,{" "}
                <EventInput ref={reference} />
              </Event>
              <FeedbackLink copyable>{link.reference}</FeedbackLink>
            </NoFeedback>
            <Divider />
            <Title>Overall</Title>
            <Rate
              disabled
              allowHalf
              defaultValue={
                props.user.feedback.reduce((s, { rating }) => s + rating, 0) /
                props.user.feedback.length
              }
            />
          </Section>
          <Section>
            <Title>Feedback</Title>
            {props.user.feedback.map(rating => {
              return (
                <Card key={rating.time}>
                  <Card.Meta
                    title={new Date(rating.time).toLocaleString()}
                    description={rating.comment}
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
