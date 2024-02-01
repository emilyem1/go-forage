import React, { useEffect } from 'react';

const SearchResults = (props) => {
  const {searchTerm} = props;

  return (
    <main>
      <h2>Search Results</h2>
      {searchTerm}
    </main>
  );
};

export default SearchResults;