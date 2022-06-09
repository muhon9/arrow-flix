import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

const Searchbar = () => {
  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchbarRef = useRef();
  const searchInputRef = useRef();

  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput("");
      setSearchInputToggle(false);
    }
  });

  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  const clearSearchInputToggle = () => {
    setSearchInput("");
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
        className={`bg-black/[0.25] border-2 border-white py-2 pr-8 pl-2 text-base text-white outline-none rounded-md w-0 opacity-0 transition-all duration-200 ease-out placeholder:text-gray-600  ${
          searchInputToggle && "w-[160px] opacity-100 sm:w-52"
        }`}
      />
      <div className="ml-2 sm:w-6 sm:h-6" onClick={handleSearchInputToggle}>
        <FiSearch size="1.5em" />
      </div>
      <div
        className={`absolute right-[18%] top-[55%] translate-y-[-50%] cursor-pointer opacity-0 pointer-events-none transition-all duration-200 ease-in-out ${
          searchInputToggle &&
          searchInput.length &&
          "opacity-100 pointer-events-auto delay-100"
        }`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
