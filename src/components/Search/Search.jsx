// Search.jsx

import React, { useState } from 'react';
import { RiSearchFill } from 'react-icons/ri';

export default function Search(props) {
  const [searchText, setSearchText] = useState('');

  function handleInputChange(event) {
    const keyword = event.target.value;
    setSearchText(keyword);
    props.onSearch(keyword);
  }

  return (
    <>
      <span className="search-icon">
        <RiSearchFill />
      </span>
      <input
        type="text"
        placeholder="Search ..."
        value={searchText}
        onChange={handleInputChange}
      />
    </>
  );
}
