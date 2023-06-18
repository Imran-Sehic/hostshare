import { useSearchContext } from 'context-providers/search-provider';
import { ListingCurrency } from 'utils/interfaces';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const UIStickyBottomBanner: React.FC<{
  pricePerNight: number;
  currency: ListingCurrency;
}> = ({ pricePerNight, currency }) => {
  const { dateIn, dateOut } = useSearchContext();

  const getFormattedPeriod = () => {
    const monthIn = new Date(dateIn).getMonth();
    const dayIn = new Date(dateIn).getUTCDate();
    const monthOut = new Date(dateOut).getMonth();
    const dayOut = new Date(dateOut).getUTCDate();
    console.log({ monthIn, monthOut });
    return monthIn === monthOut
      ? `${dayIn} - ${dayOut} ${months[monthIn]?.substring(0, 3)}`
      : `${dayIn} ${months[monthOut]?.substring(
          0,
          3
        )} - ${dayOut} ${months[1].substring(0, 3)}`;
  };

  return (
    <div className="flex w-[100vw] ml-[-25px] z-[50] px-5 py-4 text-[16px] border bg-white justify-between items-center sticky bottom-0">
      <div>
        <p>
          <b>
            {pricePerNight} {currency.symbol}
          </b>{' '}
          night
        </p>
        <p>{getFormattedPeriod()}</p>
      </div>
      <button className="bg-green text-white font-bold py-2 px-5 rounded-[5px]">
        Book
      </button>
    </div>
  );
};
