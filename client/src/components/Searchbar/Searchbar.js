import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import useOutsideClick from '../../hooks/useOutsideClick';

const Searchbar = () => {
  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchbarRef = useRef();
  const searchInputRef = useRef();

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
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
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
