import styled from "styled-components";
import Colors from "../../../utils/colors";
import "antd/dist/antd.css";

export const Wrapper = styled.main`
  background-color: ${Colors.white};
  min-height: 100vh;
  width: 100vw;
  padding: 4rem;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 500px;
`;

export const Header = styled.div``;

export const Title = styled.h1``;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 14px;
`;

export const Label = styled.label`
  padding: 0.25rem 0;
  max-width: 75%;
  line-height: 1rem;
`;
