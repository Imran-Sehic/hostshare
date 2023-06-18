import { FaStar } from 'react-icons/fa';
import { BRAND_GREEN } from 'utils/constants';

export const UIStarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const arrayToLoop = Array(Math.round(rating)).fill(0);
  return (
    <div className="flex">
      {arrayToLoop.map(item => (
        <FaStar size={16} color={BRAND_GREEN} />
      ))}
      <span className="font-bold ml-2">
        {rating === 5 ? rating.toString().concat('.0') : rating}
      </span>
    </div>
  );
};
