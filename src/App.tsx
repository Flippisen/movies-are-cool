import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import { SearchProvider } from './contexts/SearchContext';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { WatchLaterProvider } from './contexts/WatchLaterContext';
import FavouritesPage from './components/FavouritesPage/FavouritesPage';

function App() {
  return (
    <Router>
      <NavBar data-testid='navbar'></NavBar>
      <SearchProvider>
        <FavouriteProvider>
          <WatchLaterProvider>
            <div className='App' data-testid='app-element'>
              <Switch>
                <Route exact path='/'>
                  <SearchPage></SearchPage>
                </Route>
                <Route path='/favourites'>
                  <FavouritesPage></FavouritesPage>
                </Route>
                <Route path='/watch-later'>
                  <div>Not Implemented</div>
                </Route>
              </Switch>
            </div>
          </WatchLaterProvider>
        </FavouriteProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
