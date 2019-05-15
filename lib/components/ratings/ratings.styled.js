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
