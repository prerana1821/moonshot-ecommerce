import { useState } from "react";
import { api } from "~/utils/api";

const InterestMarker = () => {
  const { data } = api.category.getAll.useQuery();

  console.log(data);

  const [interests, setInterests] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const toggleInterest = (id: number) => {
  //   setInterests(
  //     interests?.map((interest) =>
  //       interest.id === id
  //         ? { ...interest, checked: !interest.checked }
  //         : interest,
  //     ),
  //   );
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInterests = interests?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = interests ? Math.ceil(interests.length / itemsPerPage) : 0;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
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
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Please mark your interests!</h2>
      <p className="mb-6">We will keep you notified.</p>
      <h3 className="mb-2 text-lg font-bold">My saved interests!</h3>
      <ul>
        {currentInterests?.map((interest) => (
          <li key={interest.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              // checked={interest.checked}
              // onChange={() => toggleInterest(interest.id)}
              className="form-checkbox h-5 w-5 rounded text-indigo-600"
            />
            <span className="ml-2">{interest.name}</span>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default InterestMarker;
