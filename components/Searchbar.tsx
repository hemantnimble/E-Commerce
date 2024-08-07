import { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchBar = ({ onSearch }: { onSearch: (products: any[]) => void }) => {
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
      <input className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5  text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0'
        id='search'
        type="text"
        value={query}
        onChange={handleChange}
        placeholder=""
      />
      <label htmlFor="search" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Search products</label>
    </>
  );
};

export default SearchBar;
