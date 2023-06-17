import { GetServerSideProps, NextPage } from 'next';
import { UIListing } from '../components/listing';
import { UILayout } from '../core/layout';
import { formatListings } from '../utils/format-listings';
import { Listing } from '../utils/interfaces';
import { readFileData } from './api/listings';

const HomePage: NextPage<{ listings: Listing[] }> = ({ listings }) => {
  return (
    <UILayout pageTitle="Hostshare - Browse you favourite listings">
      <div className="px-[40px] lg:px-[80px] py-[20px] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-[126px]">
        {listings.map(listing => (
          <UIListing {...listing} />
        ))}
      </div>
    </UILayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  listings: any;
}> = async () => {
  const listingData = await readFileData();
  const formattedListings = formatListings(JSON.parse(listingData));

  return {
    props: {
      listings: formattedListings,
    },
  };
};

export default HomePage;
