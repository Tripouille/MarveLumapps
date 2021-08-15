import React, { useState } from "react";
import { Alignment, Button, FlexBox, TextField, Theme } from "@lumx/react";
import { mdiMagnify } from "@lumx/icons";
import { useHistory } from "react-router-dom";

interface IProps {
  resultPath: string;
}

export const SearchField: React.FC<IProps> = ({ resultPath }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const onSearch = (): void => {
    if (searchQuery !== "") {
      history.push(`${resultPath}/${searchQuery}/1`);
    }
  };

  const onEnterPress: React.EventHandler<React.KeyboardEvent<InputEvent>> = ({
    key,
  }) => {
    if (key === "Enter") {
      onSearch();
    }
  };

  return (
    <FlexBox className="search-container" hAlign={Alignment.center}>
      <TextField
        theme={Theme.dark}
        placeholder="Search ..."
        icon={mdiMagnify}
        value={searchQuery}
        onChange={setSearchQuery}
        onKeyPress={onEnterPress}
      />
      <Button className="search-button" onClick={onSearch}>
        Search
      </Button>
    </FlexBox>
  );
};
