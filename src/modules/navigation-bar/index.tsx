import { RootState } from '@/redux';
import { useState } from 'react';
import {
  FaBars,
  FaDoorClosed,
  FaDoorOpen,
  FaSearch,
  FaUser,
  FaUserCircle,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakpoints } from '../../hooks/breakpoints';
import { setDateIn, setDateOut, setSearch } from '../../redux/filters-slice';
import { BRAND_GREEN } from '../../utils/constants';

export const UINavBar: React.FC = () => {
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
        <InputComponents hideSelects />
        <div className="flex items-center gap-2 px-1 pl-2 border shadow rounded-[20px]">
          <FaBars size={13} color="gray" />
          <FaUserCircle size={25} color="gray" />
        </div>
      </div>
      <div className="flex justify-center py-[8px] border-b md:hidden">
        <InputComponents hideSelects={false} />
      </div>
    </header>
  );
};

const InputComponents: React.FC<{ hideSelects?: boolean }> = ({
  hideSelects,
}) => {
  const { isTabletDown } = useBreakpoints();
  const [searchValue, setSearchValue] = useState<string>('');
  const { dateIn, dateOut } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center p-[6px] border shadow rounded-[20px]">
      {(!isTabletDown() || !hideSelects) && (
        <>
          <div className="relative pr-4 mr-2">
            <select
              className="outline-none appearance-none opacity-50"
              name="guests"
              id="guests"
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
                dispatch(setDateIn(e.target.value));
              }}
              className="outline-none opacity-50"
            />
            <FaDoorOpen
              className="absolute right-0 top-[50%] translate-y-[-50%]"
              color={BRAND_GREEN}
            />
          </div>
          <Divider />
          <div className="relative mr-2">
            <input
              type="date"
              value={dateOut}
              onChange={e => {
                dispatch(setDateOut(e.target.value));
              }}
              className="outline-none opacity-50"
            />
            <FaDoorClosed
              className="absolute right-0 top-[50%] translate-y-[-50%]"
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
                dispatch(setSearch(searchValue));
                window.location.href = `/listings?location=${searchValue.toLowerCase()}`;
              } else {
                alert('Invalid input values');
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
