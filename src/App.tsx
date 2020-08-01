import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import { SearchProvider } from './contexts/SearchContext';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { WatchLaterProvider } from './contexts/WatchLaterContext';

function App() {
  return (
    <Router>
      <NavBar data-testid='navbar'></NavBar>
      <FavouriteProvider>
        <WatchLaterProvider>
          <div className='App' data-testid='app-element'>
            <Switch>
              <SearchProvider>
                <Route exact path='/'>
                  <SearchPage></SearchPage>
                </Route>
              </SearchProvider>
              <Route path='/favourites'>
                <div>Not Implemented</div>
              </Route>
              <Route path='/watch-later'>
                <div>Not Implemented</div>
              </Route>
            </Switch>
          </div>
        </WatchLaterProvider>
      </FavouriteProvider>
    </Router>
  );
}

export default App;
