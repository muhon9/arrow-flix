import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';

import { searchContent } from 'redux/search/searchSlice';
import useOutsideClick from 'hooks/useOutsideClick';

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchbarRef = useRef();
  const searchInputRef = useRef();

  // if user land directly to search page and there is a query we want to show the result
  useEffect(() => {
    if (searchParams.get('q')) {
      dispatch(searchContent(searchParams.get('q')));
    }
  }, []);

  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput('');
      setSearchInputToggle(false);
    }
  });

  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  const clearSearchInputToggle = () => {
    setSearchInput('');
    navigate('/');
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (value.length > 0) {
      navigate(`/search?q=${value}`);
      dispatch(searchContent(value));
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="relative flex items-center mr-5 cursor-pointer sm:mr-8"
      ref={searchbarRef}
    >
      <input
        type="text"
        placeholder="Search titles, people"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`bg-black/[0.25] border-2 py-2 pr-8 pl-2 text-base w-0 text-white outline-none rounded-md transition-all duration-200 ease-out placeholder:text-gray-600  ${
          searchInputToggle ? 'w-[160px] sm:w-52 opacity-100' : 'opacity-0'
        }`}
      />
      <div className="ml-2 sm:w-6 sm:h-6" onClick={handleSearchInputToggle}>
        <FiSearch size="1.5em" />
      </div>
      <div
        className={`absolute right-[18%] top-[55%] translate-y-[-50%] cursor-pointer transition-all duration-200 ease-in-out ${
          searchInputToggle && searchInput.length
            ? 'pointer-events-auto delay-100 opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
