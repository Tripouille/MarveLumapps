import React from "react";
import { FlexBox, Alignment } from "@lumx/react";

interface IProps {
  comic: {
    title: string;
    onsale: string;
    price: string;
  };
}

export const Comic: React.FC<IProps> = ({ comic }) => {
  return (
    <FlexBox className="comic-container" hAlign={Alignment.center}>
      <h3 className="comic-name">{comic.title}</h3>
      <p>On sale: {comic.onsale}</p>
      <p>Price: ${comic.price}</p>
    </FlexBox>
  );
};
