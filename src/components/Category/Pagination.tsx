interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 3, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`rounded px-2 py-1 ${
            currentPage === i ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="rounded-md bg-gray-200 px-4 py-2">
        <button
          className="mr-2 rounded bg-gray-300 px-2 py-1"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="mr-2 rounded bg-gray-300 px-2 py-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          className="ml-2 rounded bg-gray-300 px-2 py-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="ml-2 rounded bg-gray-300 px-2 py-1"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
