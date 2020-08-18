import React from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import { SearchProvider } from './contexts/SearchContext';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { WatchLaterProvider } from './contexts/WatchLaterContext';
import FavouritesPage from './components/FavouritesPage/FavouritesPage';
import WatchLaterPage from './components/WatchLaterPage/WatchLaterPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import GenrePage from './components/GenrePage/GenrePage';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
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
                  <WatchLaterPage></WatchLaterPage>
                </Route>
                <Route path='/movies/:id'>
                  <MovieDetailsPage></MovieDetailsPage>
                </Route>
                <Route path='/genres'>
                  <GenrePage></GenrePage>
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
