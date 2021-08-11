import React from "react";
import { FlexBox, Alignment } from "@lumx/react";

interface IProps {
  comic: {
    title: string;
    onsale: string;
    price: string;
  };
}

const Comic: React.FC<IProps> = ({ comic }) => {
  return (
    <FlexBox className="comic-flexbox" hAlign={Alignment.center}>
      <h3 className="comic-name">{comic.title}</h3>
      <p className="comic-onsale">On sale: {comic.onsale}</p>
      <p className="comic-price">Price: ${comic.price}</p>
    </FlexBox>
  );
};

export default Comic;
