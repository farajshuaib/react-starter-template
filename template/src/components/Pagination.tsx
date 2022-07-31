import React, { memo } from "react";

interface props {
  setPage: (val: number) => void;
  last_page: number;
  current_page: number;
  from: number;
}

const Pagination: React.FC<props> = memo(
  ({ setPage, last_page, current_page, from }) => {
    function pagination(currentPage: number, pageCount: number) {
      let delta = 2,
        left = currentPage - delta,
        right = currentPage + delta + 1,
        result = [];

      result = Array.from(
        {
          length: pageCount,
        },
        (v, k) => k + 1
      ).filter((i) => i && i >= left && i < right);

      return result;
    }

    return (
      <div className="flex items-center justify-center  text-gray800">
        <button
          disabled={current_page === from}
          type="button"
          className={`${
            current_page === from
              ? "opacity-30 cursor-not-allowed"
              : "transform transition-all duration-500 hover:translate-x-1"
          } mx-3 flex items-center align-middle`}
          onClick={() => setPage(current_page - 1)}
        >
          <i className="bx bxs-chevron-right mx-1 text-xl"></i>
          <span>السابق</span>
        </button>

        {/* first page */}
        {current_page >= 4 && (
          <button
            onClick={() => setPage(1)}
            type="button"
            className={`mx-2 h-8 w-8 flex items-center justify-center rounded-full `}
          >
            <span>1</span>
            <span className="transform -translate-y-1 mx-1 font-bold text-xl text-gray-500 align-middle">
              ...
            </span>
          </button>
        )}

        <ul className="mx-8 flex items-center justify-between align-middle">
          {pagination(current_page, last_page).map((page, index) => (
            <li key={index}>
              <button
                onClick={() => setPage(page)}
                type="button"
                className={`mx-2 py-5 h-8 w-8 flex items-center justify-center align-middle ${
                  page === current_page
                    ? " text-secondary border-t-2 border-secondary"
                    : ""
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>

        {/* last page */}
        {last_page >= 5 && last_page !== current_page && (
          <button
            onClick={() => setPage(last_page)}
            type="button"
            className={`mx-2 h-8 w-8 flex items-center justify-center rounded-full `}
          >
            <span className="transform -translate-y-1 mx-1 font-bold text-xl text-gray-500 align-middle">
              ...
            </span>
            <span>{last_page}</span>
          </button>
        )}

        <button
          disabled={current_page === last_page}
          type="button"
          className={`${
            current_page === last_page
              ? "opacity-30 cursor-not-allowed"
              : "transform transition-all duration-500 hover:-translate-x-1"
          } mx-3 flex items-center align-middle`}
          onClick={() => setPage(current_page + 1)}
        >
          <span>التالي</span>
          <i className="bx bx-chevron-left mx-1 text-xl"></i>
        </button>
      </div>
    );
  }
);

export default Pagination;
