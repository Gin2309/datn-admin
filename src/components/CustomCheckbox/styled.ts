import { Checkbox } from "antd";
import styled from "styled-components";

export const CheckboxStyled = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff004d !important;
    border-color: #ff004d !important;
  }

  .ant-checkbox-wrapper {
    margin-top: 5px !important;
  }
`;
