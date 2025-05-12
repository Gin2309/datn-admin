import { Switch } from "antd";
import styled from "styled-components";

export const CustomSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #ff004d;
  }
  &.ant-switch:hover {
    background-color: #ff6c99 !important;
  }
  &.ant-switch:not(.ant-switch-checked) {
    background-color: #ccc;
  }
`;
