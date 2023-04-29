import { usePagination, DOTS } from "../helpers/usePagination";
export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex gap-[28px] justify-center items-center">
      <li>
        <button
          className="paginationItems"
          type="button"
          disabled={currentPage === 1}
          onClick={onPrevious}>
          {"<"}
        </button>
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className="paginationDots"
              key={pageNumber + idx}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}>
            <button
              className={`${
                pageNumber === currentPage
                  ? "paginationItemsCurrent"
                  : "paginationItems"
              }`}
              disabled={pageNumber === currentPage}
              type="button">
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className="paginationItems"
          type="button"
          disabled={currentPage === lastPage}
          onClick={onNext}>
          {">"}
        </button>
      </li>
    </ul>
  );
};
