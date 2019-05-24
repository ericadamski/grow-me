import styled from "styled-components";
import { Typography } from "antd";
import Colors from "../../../utils/colors";

const { Paragraph } = Typography;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h2`
  padding: 0;
  margin: 0.25rem;
  font-size: 1.25;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2.5rem;
`;

export const NoFeedback = styled.h3`
  font-size: 1.25rem;
  text-align: center;
`;

export const FeedbackLink = styled(Paragraph)`
  padding: 0.25rem;
  border-radius: 2px;
  background: ${Colors.pink}6f;
  font-size: 1rem;
  text-align: center;
`;

export const Event = styled.div`
  margin: 2rem;
`;

export const EventName = styled.div.attrs(() => ({
  contentEditable: true,
}))`
  text-align: left;
  display: inline-block;
  min-width: 50px;
  border-bottom: 2px solid black;
`;

export const EventDetails = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  margin: 2rem 0;
`;
