import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div className='App'>
        <Switch>
          <Route path='/'>
            <SearchPage></SearchPage>
          </Route>
          <Route path='/favourites'>
            <div>Not Implemented</div>
          </Route>
          <Route path='/watch-later'>
            <div>Not Implemented</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
