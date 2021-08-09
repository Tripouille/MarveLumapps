import React, {
  useState 
} from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const onSearch = async () => {
    if (searchQuery !== '') {
      history.push(`${Path.result}/${searchQuery}/1`);
    }
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onSearch} />
      <Switch>
        <Route exact path='/'>
					<Welcome />
				</Route>
        <Route exact path={`${Path.result}/:searchQuery/:currentPage`}>
					<SearchResults />
				</Route>
      </Switch>
	  </>
  );
}

export default App;