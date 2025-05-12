import styled from "styled-components";

// interface StyledStepProps {
//   isActive: boolean;
// }

// export const StyleWrapper = styled.div<StyledStepProps>`
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     .step-number {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       font-size: 16px;
//       background-color: ${({ isActive }) => (isActive ? "#FF004D" : "#f4f4f4")};
//       color: ${({ isActive }) => (isActive ? "#fff" : "#495057")};
//       font-weight: 400;
//     }

//     .step-title {
//       font-size: 14px;
//       color: ${({ isActive }) => (isActive ? "#FF004D" : "#6C757D")};
//       text-align: center;
//     }
// `;

export const StyleWrapper = styled.div<any>`
  .ant-steps-item-active .ant-steps-item-icon {
    background-color: #ff004d;
    border-color: #ff004d;
  }

  .ant-steps-item-active .ant-steps-item-content .ant-steps-item-title {
    color: #ff004d !important;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff0f5;
    border-color: #ff6c99;
  }

  .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-title {
    color: #495057 !important;
  }

  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: #ff6c99 !important;
  }

  .ant-steps .ant-steps-item-tail::after {
    height: 2px;
  }

  .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon {
    color: #ff004d;
  }

  .ant-steps-item-content .ant-steps-item-title {
    color: #6c757d !important;
  }

  .ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #f4f4f4;
  }

  .ant-steps.ant-steps-label-vertical .ant-steps-item-content {
    margin-top: 0 !important;
  }
`;
