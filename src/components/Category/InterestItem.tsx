import Image from "next/image";
import { type CategoryI } from "~/utils/types";

interface InterestItemProps {
  interest: CategoryI;
  markInterest: (id: number) => void;
  loading: boolean;
}

const InterestItem: React.FC<InterestItemProps> = ({
  interest,
  markInterest,
  loading,
}) => (
  <li key={interest.id} className="mb-2 flex items-center">
    {!loading ? (
      <input
        type="checkbox"
        onChange={() => markInterest(interest.id)}
        disabled={loading}
        checked={interest.checked}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-950 focus:ring-2 focus:ring-gray-950"
      />
    ) : (
      <div className="flex justify-center">
        <Image src="loading.svg" width="15" height="15" alt="Loading" />
      </div>
    )}
    <label className="ms-2 text-sm font-medium text-black">
      {interest.name}
    </label>
  </li>
);

export default InterestItem;
