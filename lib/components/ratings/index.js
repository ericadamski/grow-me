// #region imports
import React, { Fragment } from "react";
import fetch from "isomorphic-unfetch";
import { Rate, Card, Divider } from "antd";
import {
  Wrapper,
  Section,
  Title,
  NoFeedback,
  FeedbackLink,
} from "./ratings.styled";
import "antd/dist/antd.css";
// #endregion imports

export default function Ratings(props) {
  const link = `https://grow-me.now.sh/f/${props.user._id}`;

  return (
    <Wrapper>
      {!props.user.feedback || props.user.feedback.length < 1 ? (
        <Section>
          <NoFeedback>
            You currently have no feedback <span role="img">🤔</span>, get some!
            <br /> Share your personal feedback link
            <br />
            <br />
            <FeedbackLink>
              <Paragraph copyable>
                https://grow-me.now.sh/f/{props.user._id}
              </Paragraph>
            </FeedbackLink>
          </NoFeedback>
        </Section>
      ) : (
        <Fragment>
          <Section>
            <NoFeedback>
              Share your personal feedback link
              <br />
              <FeedbackLink copyable>{link}</FeedbackLink>
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
