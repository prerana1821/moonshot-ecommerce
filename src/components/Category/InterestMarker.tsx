import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type CategoryI } from "~/utils/types";
import Pagination from "./Pagination";
import InterestItem from "./InterestItem";

interface InterestMarkerProps {
  data: CategoryI[];
  email: string;
}

const InterestMarker: React.FC<InterestMarkerProps> = ({ data, email }) => {
  const [interests, setInterests] = useState<CategoryI[]>(data);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {},
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setInterests(data);
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const mutation = api.category.markInterest.useMutation();

  const markInterest = async (id: number) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [id]: true,
      }));
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
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [id]: false,
      }));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInterests = interests?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = interests ? Math.ceil(interests.length / itemsPerPage) : 0;

  return (
    <div className="rounded-lg border border-solid border-gray-500 bg-white px-14 py-8">
      <h2 className="mb-4 text-center text-xl font-bold">
        Please mark your interests!
      </h2>
      <p className="mb-6 text-center">We will keep you notified.</p>
      <h3 className="mb-4 text-lg font-bold">My saved interests!</h3>
      <ul>
        {currentInterests?.map((interest) => (
          <InterestItem
            key={interest.id}
            interest={interest}
            markInterest={markInterest}
            loading={loadingStates[interest.id] || false}
          />
        ))}
      </ul>
      {error && <div>Error: {error}</div>}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default InterestMarker;
