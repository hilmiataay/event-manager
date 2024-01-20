// App.js

import data from './data';
import React, { useState } from "react";
import './index.css';
import './style.css';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Section from './components/Section/Section';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const locations = Array.from(
    new Set(data.map((event) => event.eventLocation))
  );

  function handleFilter(newFilter) {
    setActiveFilter(newFilter.toLowerCase());
  }

  function handleSearch(keyword) {
    setSearchKeyword(keyword.toLowerCase());
  }

  function handleLocationFilter(location) {
    setSelectedLocations((prevLocations) =>
      prevLocations.includes(location)
        ? prevLocations.filter((loc) => loc !== location)
        : [...prevLocations, location]
    );
  }

  function handleAddToCalendar(date) {
    if (!selectedDates.includes(date)) {
      setSelectedDates((prevDates) => [...prevDates, date]);
      console.log(`Etkinlik tarihi seçildi: ${date}`);
    }
  }

  return (
    <div className="App">
      <Header />
      <Navbar
        onClickFilter={handleFilter}
        onSearch={handleSearch}
        onLocationFilter={handleLocationFilter}
        locations={locations}
      />
      <div className="container">
        {data
          .filter(
            (event) =>
              (activeFilter === 'all' ||
                (event &&
                  event.concept &&
                  event.concept.toLowerCase() === activeFilter)) &&
              (searchKeyword === '' ||
                (event &&
                  event.keywords &&
                  event.keywords.toLowerCase().includes(searchKeyword))) &&
              (selectedLocations.length === 0 ||
                selectedLocations.includes(event.eventLocation))
          )
          .map((event) => (
            <Section
              key={event.id}
              activeFilter={activeFilter}
              date={`${event.day}/${event.month}/${event.year}`}
              dateDetail={event.dateDetail}
              concept={event.concept.toLowerCase()}
              eventImg={event.eventImg}
              eventTitle={event.eventTitle}
              eventLocation={event.eventLocation}
              eventDescription={event.eventDescription}
              onAddToCalendar={handleAddToCalendar}
            />
          ))}
      </div>
    </div>
  );
}


export default App;