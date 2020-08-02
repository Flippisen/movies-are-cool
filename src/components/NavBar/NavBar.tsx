import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

export default () => {
    return (
        <div className='NavBar'>
            <NavLink exact to='/' className='NavItem'>
                <SearchIcon></SearchIcon>
                <div>Search</div>
            </NavLink>
            <NavLink to='/favourites' className='NavItem'>
                <FavouriteIcon></FavouriteIcon>
                <div>Favourites</div>
            </NavLink>
            <NavLink to='/watch-later' className='NavItem'>
                <PlaylistPlayIcon></PlaylistPlayIcon>
                <div>Watch Later</div>
            </NavLink>
        </div>
    )
}