// Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiFilter } from 'react-icons/bi';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import Calendar from '../Calendar/Calendar';

function Navbar({ onClickFilter, onSearch, onLocationFilter, locations }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [locationFilterVisible, setLocationFilterVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const handleClick = (event) => {
    const clickedItem = event.target;
    const items = document.querySelectorAll('.navList li');
    items.forEach((item) => item.classList.remove('active'));
    clickedItem.classList.add('active');
    const clickedMenu = clickedItem.textContent;
    onClickFilter(clickedMenu);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleLocationFilter = () => {
    setLocationFilterVisible(!locationFilterVisible);
  };

  const handleOutsideClick = (event) => {
    if (locationFilterVisible) {
      const filterBox = filterRef.current;
      if (filterBox && !filterBox.contains(event.target)) {
        setLocationFilterVisible(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleAllEvents() {
    onClickFilter('all');
  }

  const filterRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [locationFilterVisible]);

  return (
    <>
      <div id="navbar" className="navbar">
        <div className="container-nav">
          <div className="nav-menu">
            {viewportWidth <= 1050 && (
              <button className="menu-toggle" onClick={toggleMenu}>
                <span className="toggle-icon">
                  <AiOutlineMenu />
                </span>
              </button>
            )}
            <ul className="navList" style={{ display: viewportWidth > 1050 || menuVisible ? 'flex' : 'none' }}>
              <li onClick={handleAllEvents} className="active">
                All Events
              </li>
              <li onClick={handleClick}>Theatre</li>
              <li onClick={handleClick}>Concert</li>
              <li onClick={handleClick}>Stand Up</li>
              <li onClick={handleClick}>Cinema</li>
              <li onClick={handleClick}>Kids</li>
            </ul>
            <div className="search-box">
              <Search onSearch={onSearch} />
            </div>
          </div>
        </div>

        <div className="filter-container">
          <div className="filter-content">
            <div className="filter-box" ref={filterRef}>
              <div className="filter-icon-box" onClick={toggleLocationFilter}>
                <span className="filter-icon">
                  <BiFilter className='active-icon' />
                </span>
                <p>Filters</p>
              </div>
              <div className="location-list-box" style={{ display: locationFilterVisible ? 'block' : 'none' }}>
                {locationFilterVisible && (
                  <Filter locations={locations} onLocationChange={onLocationFilter} />
                )}
              </div>
            </div>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;