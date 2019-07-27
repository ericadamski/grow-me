import React from "react";
import { Wrapper, Overlay, Content } from "./modal.styled";

export default function Modal(props) {
  return (
    <Wrapper>
      <Overlay />
      <Content>{props.children}</Content>
    </Wrapper>
  );
}
