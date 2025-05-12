import React from "react";
import { Steps } from "antd";
import { StyleWrapper } from "./styled";

const CustomSteps = ({ current, items }: { current: any; items: any }) => {
  return (
    <StyleWrapper>
      <Steps labelPlacement="vertical" current={current} items={items} direction="horizontal" />
    </StyleWrapper>
  );
};

export default CustomSteps;
