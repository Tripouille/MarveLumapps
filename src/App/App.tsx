import React from "react";
import { Route, Switch } from "react-router-dom";
import { CharacterDetails } from "../components/CharacterDetails";
import { Header } from "../components/Header";
import { SearchResults, Welcome } from "../components";

enum Path {
  result = "/results",
  details = "/details",
}

function App() {
  return (
    <>
      <Header resultPath={Path.result} />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path={`${Path.result}/:searchQuery/:currentPage`}>
          <SearchResults path={Path.result} detailsPath={Path.details} />
        </Route>
        <Route exact path={`${Path.details}/:characterId`}>
          <CharacterDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
