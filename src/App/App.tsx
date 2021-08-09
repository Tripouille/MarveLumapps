import React from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { Header, SearchResults, Welcome } from '../components';


enum Path {
  result = "/results"
}

function App() {
  const history = useHistory();

  const onSearch = (searchQuery: string): void => {
    if (searchQuery !== '') {
      history.push(`${Path.result}/${searchQuery}/1`);
    }
    console.log('onSearch');
  };

  return (
    <>
      <Header onSearch={onSearch} />
      <Switch>
        <Route exact path='/'>
					<Welcome />
				</Route>
        <Route exact path={`${Path.result}/:searchQuery/:currentPage`}>
					<SearchResults path={Path.result} />
				</Route>
      </Switch>
	  </>
  );
}

export default App;