import { useSearchContext } from 'context-providers/search-provider';
import { useBreakpoints } from 'hooks/breakpoints';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  FaBars,
  FaDoorClosed,
  FaDoorOpen,
  FaSearch,
  FaUser,
  FaUserCircle,
} from 'react-icons/fa';
import { BRAND_GREEN } from 'utils/constants';

export const UINavBar: React.FC = () => {
  const [isToastSet, setToast] = useState<boolean>(false);

  return (
    <header className="fixed w-[100%] z-10 bg-white">
      <div className="flex justify-between px-[40px] lg:px-[80px] py-[8px] lg:py-[16px] border-b">
        <a href="/">
          <img
            className="h-[30px] hidden lg:block"
            src="/assets/hostshare-green.png"
            alt="hostshare-logo"
          />
          <img
            className="h-[30px] block lg:hidden"
            src="/assets/house.png"
            alt="hostshare-logo"
          />
        </a>
        <InputComponents
          hideSelects
          isToastSet={isToastSet}
          setToast={setToast}
        />
        <div className="flex items-center gap-2 px-1 pl-2 border shadow rounded-[20px]">
          <FaBars size={13} color="gray" />
          <FaUserCircle size={25} color="gray" />
        </div>
      </div>
      <div className="flex justify-center py-[8px] border-b md:hidden">
        <InputComponents
          hideSelects={false}
          isToastSet={isToastSet}
          setToast={setToast}
        />
      </div>
      <div
        className={`flex left-[50%] w-[200px] ${
          isToastSet ? 'top-[30%] transition-all' : 'top-[-100%] transition-all'
        } translate-x-[-50%] justify-center items-center absolute top-0 bg-red-600 text-white rounded-[5px] py-1 px-4 opacity-[0.7]`}
      >
        <p>Invalid search input</p>
      </div>
    </header>
  );
};

const InputComponents: React.FC<{
  hideSelects?: boolean;
  isToastSet: boolean;
  setToast: Dispatch<SetStateAction<boolean>>;
}> = ({ hideSelects, isToastSet, setToast }) => {
  const { isTabletDown } = useBreakpoints();
  const [searchValue, setSearchValue] = useState<string>('');
  const {
    dateIn,
    dateOut,
    setDateInValueCall,
    setDateOutValueCall,
    setSearchValueCall,
    guests,
    setGuestsValueCall,
  } = useSearchContext();

  return (
    <div className="flex items-center p-[6px] border shadow rounded-[20px]">
      {(!isTabletDown() || !hideSelects) && (
        <>
          <div className="relative pr-4 mr-2">
            <select
              className="outline-none appearance-none opacity-50"
              name="guests"
              id="guests"
              value={guests}
              onChange={e => setGuestsValueCall(e.target.value)}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="2">3 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4+ guests</option>
            </select>
            <FaUser
              className="absolute right-0 top-[50%] translate-y-[-50%]"
              color={BRAND_GREEN}
            />
          </div>
          <Divider />
          <div className="relative mr-2">
            <input
              type="date"
              value={dateIn}
              onChange={e => {
                setDateInValueCall(e.target.value);
              }}
              className="outline-none opacity-50"
            />
            <FaDoorOpen
              className="absolute right-0 top-[50%] translate-y-[-50%] z-[-1]"
              color={BRAND_GREEN}
              onClick={e => {
                e.preventDefault();
              }}
            />
          </div>
          <Divider />
          <div className="relative mr-2">
            <input
              type="date"
              value={dateOut}
              onChange={e => {
                setDateOutValueCall(e.target.value);
              }}
              className="outline-none opacity-50"
            />
            <FaDoorClosed
              className="absolute right-0 top-[50%] translate-y-[-50%] z-[-1]"
              color={BRAND_GREEN}
            />
          </div>
        </>
      )}
      {!isTabletDown() && <Divider />}
      {(!isTabletDown() || hideSelects) && (
        <>
          <input
            placeholder="Search..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="outline-none h-4"
          />
          <i
            className="bg-green p-[8px] rounded-[20px] cursor-pointer"
            onClick={() => {
              if (!!searchValue && !!dateIn && !!dateOut) {
                setSearchValueCall(searchValue);
                window.location.href = `/listings?location=${searchValue.toLowerCase()}`;
              } else {
                //alert('Invalid input values');
                setToast(true);
                setTimeout(() => {
                  setToast(false);
                }, 3000);
              }
            }}
          >
            <FaSearch color="white" size={10} />
          </i>
        </>
      )}
    </div>
  );
};

const Divider = () => {
  return <div className="border border-gray h-[100%] mr-2"></div>;
};
