import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages, totalResults, handlePageClick }) => {
  return (
    <div className="flex w-full justify-end items-center">
      <div className="mr-4">Total Items: {totalResults}</div>
      <ReactPaginate
        containerClassName="flex my-2 "
        activeClassName="text-white"
        activeLinkClassName="bg-blue-400 p-2"
        pageLinkClassName="bg-white border-2 border-gray-200 p-2"
        previousLinkClassName="bg-white border-2 border-gray-200 p-2"
        nextLinkClassName="bg-white border-2 border-gray-200 p-2"
        disabledLinkClassName="text-gray-400"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="Previous"
      />
    </div>
  );
};

export default Pagination;
