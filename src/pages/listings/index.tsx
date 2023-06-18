import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { FaList, FaMap } from 'react-icons/fa';
import { GoogleMapComponent } from '../../components/google-maps';
import { UIListing } from '../../components/listing';
import { UIModal } from '../../components/modal';
import { UILayout } from '../../core/layout';
import { readFileData } from '../../db/utils';
import { useBreakpoints } from '../../hooks/breakpoints';
import { BRAND_GREEN } from '../../utils/constants';
import { formatListings } from '../../utils/format-listings';
import { Listing } from '../../utils/interfaces';

const ListingsPage: NextPage<{ listings: Listing[] }> = ({ listings }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isMobile, isDesktop } = useBreakpoints();

  return (
    <UILayout
      pageTitle={`Select your listing - Showing ${listings.length} ${
        listings.length > 1 ? 'listings' : 'listing'
      }`}
      shrinkFooter
    >
      {listings.length > 0 ? (
        <div className="flex">
          <div className="px-[40px] w-[100%] lg:w-[70%] lg:px-[80px] py-[20px] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-[126px]">
            {listings.map(listing => (
              <UIListing {...listing} />
            ))}
          </div>
          {isDesktop() && (
            <div className="w-[30%] h-[100vh] fixed right-0">
              <GoogleMapComponent listings={listings.slice(0, 5)} />
            </div>
          )}
          {!isMobile() && !isDesktop() && (
            <button
              className="fixed top-[20%] right-0 bg-white p-2 rounded-[5px] border-2 border-green"
              onClick={() => setIsModalOpen(true)}
            >
              <FaMap size={36} color={BRAND_GREEN} />
            </button>
          )}
          {isMobile() && (
            <button
              className="flex justify-center items-center fixed bottom-0 bg-green p-3 w-[100%] text-white text-xl z-[100]"
              onClick={() => setIsModalOpen(true)}
            >
              Map <FaMap className="ml-3" />
            </button>
          )}
          <UIModal isModalOpen={isModalOpen} isMobile>
            <div className="w-[100%] h-[100%]">
              <button
                className="flex items-center fixed bg-white top-3 left-3 p-3 font-bold text-[16px] z-[1000] rounded-[5px]"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <FaList />
              </button>

              <div className="w-[100%] h-[100%]">
                <GoogleMapComponent listings={listings.slice(0, 5)} />
              </div>
            </div>
          </UIModal>
        </div>
      ) : (
        <div className="h-[100vh] flex justify-center items-center text-[36px]">
          No Listings available
        </div>
      )}
    </UILayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  listings: any;
}> = async ctx => {
  const { query } = ctx;
  const listingData = await readFileData();
  const formattedListings = formatListings(JSON.parse(listingData));
  const filteredListings = formattedListings.filter(listing => {
    return listing.location.city.toLowerCase() === query?.location;
  });

  return {
    props: {
      listings: filteredListings,
    },
  };
};

export default ListingsPage;
