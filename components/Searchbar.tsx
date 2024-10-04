import { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchBar =  ({
  onSearch,
  onSelect // New prop for handling selection
}: {
  onSearch: (products: any[]) => void;
  onSelect: () => void; // New prop type for selection
}) => {
  const [query, setQuery] = useState('');

  // Define a debounced function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        try {
          const response = await axios.get('/api/products/search', { params: { query } });
          if (Array.isArray(response.data.products)) {
            onSearch(response.data.products);
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        onSearch([]);
      }
    }, 300), // 300ms delay
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <>
      
        <div className="searchbar">
          <div className="searchbar-wrapper">
            <div className="searchbar-left">
              <div className="search-icon-wrapper">
                <span className="search-icon searchbar-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                    </path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="searchbar-center">
              <div className="searchbar-input-spacer" />
              <input
                id='search'
                type="text"
                value={query}
                onChange={handleChange}
                className="searchbar-input" maxLength={2048} name="q" autoCapitalize="off" autoComplete="off" title="Search" role="combobox" placeholder="Search products" />
            </div>
          </div>
        </div>
      

    </>
  );
};

export default SearchBar;
