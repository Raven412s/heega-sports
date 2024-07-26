import React from 'react';

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <div
        className={`page ${page === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(page - 1)}
      >
        Previous Page
      </div>
      <div className="current">{page}</div>
      <div
        className={`page ${page === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(page + 1)}
      >
        Next Page
      </div>
    </div>
  );
}

export default Pagination;
