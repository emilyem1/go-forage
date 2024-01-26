import React from 'react';
import BlogList from './BlogList';


const TopNavigation = (props) => {
  const { route } = props;
  return (
    <div className="top-nav-bar">
      <nav>
        <ul style={{ listStyleType: "none", display: "flex" }}>
          <li style={{ cursor: "pointer", padding: "2em" }} onClick={() => {route("PUBLIC");}}> Map</li>
          <li style={{ cursor: "pointer", padding: "2em"  }} onClick={() => {route("BLOGLIST");}}> Blogs</li>
          <li style={{ cursor: "pointer", padding: "2em"  }} onClick={() => {route("MUSHROOMS");}}> Mushrooms</li>
          <li style={{ cursor: "pointer", padding: "2em"  }} onClick={() => {route("FIELDJOURNAL");}}> Field Journal</li>
        </ul>
      </nav>
    </div>
  )
};

export default TopNavigation;