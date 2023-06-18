import { useSearchContext } from 'context-providers/search-provider';
import { FaAngleDown, FaStar } from 'react-icons/fa';
import { Listing } from 'utils/interfaces';

export const UIStickyReservationWidget: React.FC<{ listing: Listing }> = ({
  listing,
}) => {
  const { dateIn, dateOut, guests } = useSearchContext();
  const getNumberOfDays = () => {
    const dateInDate = new Date(dateIn);
    const dateOutDate = new Date(dateOut);
    return (
      (dateOutDate.getTime() - dateInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <>
      <div className="xs:w-[45%] lg:w-[35%]">
        <div className="p-5 border sticky top-[120px] mb-4 rounded-[10px]">
          <div className="flex justify-between mb-3">
            <p className="line-clamp-1">
              <b className="text-[20px]">
                {listing.pricePerNight}
                {listing.currency.symbol}
              </b>{' '}
              night
            </p>
            <p className="flex items-center gap-1">
              <FaStar />
              <span>{listing.ratings.value}</span>
              &#x2022;
              <span className="text-gray-500 line-clamp-1">
                {listing.reviewCount} reviews
              </span>
            </p>
          </div>
          <div className="border border-black rounded-[5px]">
            <div className="grid grid-cols-2 border-b border-black">
              <div className="p-2 border-r border-black">
                <p className="uppercase font-bold text-[8px]">Check-in</p>
                <span className="line-clamp-[1]">{dateIn}</span>
              </div>
              <div className="p-2">
                <p className="uppercase font-bold text-[8px]">Check-out</p>
                <span className="line-clamp-[1]">{dateOut}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div>
                <p className="uppercase font-bold text-[8px]">Guests</p>
                <span>
                  {guests} {guests === '1' ? 'guest' : 'guests'}
                </span>
              </div>
              <FaAngleDown size={16} />
            </div>
          </div>
          <button className="bg-green text-white rounded-[5px] w-[100%] py-2 mt-3 font-bold">
            Book
          </button>
          <p className="flex justify-between mt-4 mb-4">
            <span>
              {listing.pricePerNight} {listing.currency.symbol} x{' '}
              {getNumberOfDays()} nights
            </span>
            <span>
              {listing.pricePerNight * getNumberOfDays()}{' '}
              {listing.currency.symbol}
            </span>
          </p>
          <hr />
          <p className="flex justify-between mt-4 font-bold">
            <span>Total</span>
            <span>
              {listing.pricePerNight * getNumberOfDays()}{' '}
              {listing.currency.symbol}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
