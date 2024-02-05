import React from "react";
import BookmarkIcon from "./BookmarkIcon";

import "../styles/BookmarkButton.scss";

function BookmarkButton(props) {
  const { blog, onBookmarkClick, bookmarkSelect, user_id } = props;
  
  const handleLikeClick = async () => {
    if (bookmarkSelect){
      try {
        const response = await fetch(
          "http://localhost:8001/api/bookmarks/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to post bookmark/delete. Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log("Bookmark deleted:", responseData);
  
        // Reset the comment box values after submission
        onBookmarkClick(blog);
      } catch (error) {
        console.error("Error when posting:", error.message);
      }
    }else{
      try {
        const response = await fetch(
          "http://localhost:8001/api/bookmarks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to post bookmark. Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log("Bookmark posted:", responseData);
  
        // Reset the comment box values after submission
        onBookmarkClick(blog);
      } catch (error) {
        console.error("Error when posting:", error.message);
      }
    }
    
  };

  return (
    <div >
      <div onClick={handleLikeClick} className="bookmark-icon-svg">
        <BookmarkIcon selected={bookmarkSelect} />
      </div>
    </div>
  );
}

export default BookmarkButton;
