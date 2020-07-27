import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

export default function NavBar() {
    return (
        <div className='NavBar'>
            <div className='NavItem'>
                <SearchIcon></SearchIcon>
                <NavLink exact to='/'>Search</NavLink>
            </div>
            <div className='NavItem'>
                <FavouriteIcon></FavouriteIcon>
                <NavLink to='/favourites'>Favourites</NavLink>
            </div>
            <div className='NavItem'>
                <PlaylistPlayIcon></PlaylistPlayIcon>
                <NavLink to='/watch-later'>Watch Later</NavLink>
            </div>
        </div>
    )
}