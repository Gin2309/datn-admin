import React from "react";
import { CustomTagWrapper } from "./styled";

type CustomTagProps = {
  color: string;
  title: string;
};

const CustomTag: React.FC<CustomTagProps> = ({ color, title }) => {
  return (
    // success | processing | warning | error | volcano | default
    <CustomTagWrapper color={color} bordered={false}>
      {title}
    </CustomTagWrapper>
  );
};

export default CustomTag;
