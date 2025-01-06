import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, onPageChange, page, setPage }) => {
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected); // Update the page state in the parent
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
        forcePage={page-1} // Force the active page to match the `page` prop
      />
    </div>
  );
};

export default Pagination;
