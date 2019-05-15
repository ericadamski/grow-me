import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import { Rate, Form, Input, Button } from "antd";
import title from "title";
import {
  Wrapper,
  Header,
  Title,
  Container,
  Label,
  Field,
} from "./styled/feedback.styled";

function Feedback(props) {
  const { getFieldDecorator } = props.form;

  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        values.time = Date.now();

        fetch(`${process.env.BASE_URL}/api/user/feedback`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: props.id, feedback: values }),
        }).then(() => {
          setFeedbackSent(true);

          setTimeout(() => Router.replace("/"), 3000);
        });
      }
    });
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>{props.firstName} wants your feedback!</Title>
        </Header>
        {feedbackSent ? (
          <Label>Thank you for your feedback!</Label>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Field>
                <Label>{title(`Give ${props.firstName} A Rating`)}</Label>
                {getFieldDecorator("rating", {
                  rules: [
                    {
                      required: true,
                      message: `Let's help ${
                        props.firstName
                      } improve by giving them some feedback.`,
                    },
                  ],
                })(<Rate allowHalf />)}
              </Field>
            </Form.Item>
            <Form.Item>
              <Field>
                <Label>
                  {title(
                    `Give ${
                      props.firstName
                    } some feedback, positive or negative, so that they can grow`,
                  )}
                </Label>
                {getFieldDecorator("comment")(
                  <Input.TextArea
                    rows={4}
                    autosize={{ minRows: 4, maxRows: 4 }}
                  />,
                )}
              </Field>
            </Form.Item>
            <Button block htmlType="submit">
              Send
            </Button>
          </Form>
        )}
      </Container>
    </Wrapper>
  );
}

Feedback.getInitialProps = async ({ query }) => {
  const { firstName } = await fetch(`${process.env.BASE_URL}/api/user/name`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: query.id }),
  }).then(response => response.json());

  return { firstName, id: query.id };
};

export default Form.create({ name: "feedback" })(Feedback);
