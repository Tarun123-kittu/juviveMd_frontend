import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    if (onPageChange) {
      onPageChange(selectedPage.selected);
    }
  };

  return (
    <div>
      <ReactPaginate
        pageCount={totalPages} 
        pageRangeDisplayed={5} 
        marginPagesDisplayed={2} 
        onPageChange={handlePageChange}
        containerClassName="pagination"
        pageClassName="page-item" 
        pageLinkClassName="page-link" 
        activeClassName="active" 
      />
    </div>
  );
};

export default Pagination;
