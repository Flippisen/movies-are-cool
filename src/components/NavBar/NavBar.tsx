import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className='NavBar'>
            <div className='NavItem'>
                <NavLink exact to='/'>Search</NavLink>
            </div>
            <div className='NavItem'>
                <NavLink to='/favourites'>Favourites</NavLink>
            </div>
            <div className='NavItem'>
                <NavLink to='/watch-later'>Watch Later</NavLink>
            </div>
        </div>
    )
}