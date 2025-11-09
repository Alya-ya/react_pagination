import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  // стабильный массив опций для perPage
  const perPageOptions = [3, 5, 10, 20];

  return (
    <div>
      <ul className="pagination">
        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            data-cy="prevLink"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            «
          </button>
        </li>

        {/* Page numbers */}
        {pages.map(page => (
          <li
            key={`page-${page}`}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <button data-cy="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            data-cy="nextLink"
            aria-disabled={currentPage === totalPages}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          >
            »
          </button>
        </li>
      </ul>

      {/* Page info */}
      <div data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </div>

      {/* perPage selector */}
      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => onPerPageChange(Number(e.target.value))}
      >
        {perPageOptions.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
