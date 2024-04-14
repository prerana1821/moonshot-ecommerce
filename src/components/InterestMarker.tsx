import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const InterestMarker = ({
  data,
  email,
}: {
  data: {
    checked: boolean;
    id: number;
    name: string;
  }[];
  email: string;
}) => {
  const [interests, setInterests] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInterests(data);
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const mutation = api.category.markInterest.useMutation();

  const markInterest = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await mutation.mutateAsync({
        email: email,
        categoryId: id,
      });
      setInterests((prevInterests) =>
        prevInterests.map((interest) =>
          interest.id === id
            ? { ...interest, checked: !interest.checked }
            : interest,
        ),
      );
    } catch (error) {
      setError("Failed to mark interest");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInterests = interests?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = interests ? Math.ceil(interests.length / itemsPerPage) : 0;

  const renderPageNumbers = () => {
    const pageNumbers = [];

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
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Please mark your interests!</h2>
      <p className="mb-6">We will keep you notified.</p>
      <h3 className="mb-2 text-lg font-bold">My saved interests!</h3>
      <ul>
        {currentInterests?.map((interest) => (
          <li key={interest.id} className="mb-2 flex items-center">
            {!loading ? (
              <input
                type="checkbox"
                onChange={() => markInterest(interest.id)}
                disabled={loading}
                checked={interest.checked}
                className="form-checkbox h-5 w-5 rounded text-indigo-600"
              />
            ) : (
              <div className="flex justify-center">load</div>
            )}
            <span className="ml-2">{interest.name}</span>
          </li>
        ))}
      </ul>
      {error && <div>Error: {error}</div>}
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
