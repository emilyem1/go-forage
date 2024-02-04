import React from 'react';

const BookmarkIcon = ({props}) => {
  // const { selected } = props;
  const selected = true;
  return (
    <div>
    {selected ? <img src = "./assets/bookmark_active.svg"/> : <img src = "./assets/bookmark.svg"/>}
    </div>
  );
};

export default BookmarkIcon;
