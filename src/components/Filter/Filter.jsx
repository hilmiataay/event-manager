// Filter.js

import React from 'react';
import './Filter.css';

export default function Filter({ locations, onLocationChange }) {
  return (
    <>
      <div className="location-main-box">
        <div className="location-filter">
          {locations.map((location, index) => (
            <div key={location}>
              <input
                type="checkbox"
                readOnly
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  border: '1px solid #999',
                  width: '16px',
                  height: '16px',
                  borderRadius: '2px',
                  marginRight: '5px',
                  cursor: "pointer"
                }}
                id={location}
                onChange={() => onLocationChange(location)}
              />
              <label htmlFor={location}>{location}</label>
              {index !== locations.length - 1 && <hr />} {/* Sonuncuya eklenmemesi için kontrol */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
