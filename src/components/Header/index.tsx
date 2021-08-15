/* eslint-disable react/prop-types */
import React from "react";
import { FlexBox, Alignment } from "@lumx/react";
import { SearchField } from "..";
import logo from "./logo.svg";

interface IProps {
  resultPath: string;
}

export const Header: React.FC<IProps> = ({ resultPath }) => {
  return (
    <header className="lumx-spacing-padding-big header">
      <FlexBox className="header-flexbox" hAlign={Alignment.center}>
        <img className="marvel-logo" src={logo} alt="marvel logo" />
        <SearchField resultPath={resultPath} />
      </FlexBox>
    </header>
  );
};
