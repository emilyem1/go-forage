import React from "react";
import BookmarkIcon from "./BookmarkIcon";

import '../styles/BookmarkButton.scss';

function BookmarkButton(props) {
  const { blog, onBookmarkClick, bookmarkSelect } = props;
  
  const handleLikeClick = () => {
    onBookmarkClick(blog);
    console.log (blog)
  }
  
  return (
    <div >
      <div onClick={handleLikeClick} className="bookmark-icon-svg">
        <BookmarkIcon selected={bookmarkSelect} />
      </div>
    </div>
  );
}

export default BookmarkButton;
