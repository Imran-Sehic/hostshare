import { GetServerSideProps, NextPage } from 'next';
import { UIHeader } from '../../../components/listing-components/ui-header';
import { UILocationMap } from '../../../components/listing-components/ui-location-map';
import { UIMainListingContent } from '../../../components/listing-components/ui-main-listing-content';
import { UIStickyBottomBanner } from '../../../components/listing-components/ui-sticky-bottom-banner';
import { UIStickyReservationWidget } from '../../../components/listing-components/ui-sticky-reservation';
import { UILayout } from '../../../core/layout';
import { readFileData } from '../../../db/utils';
import { useBreakpoints } from '../../../hooks/breakpoints';
import { formatListings } from '../../../utils/format-listings';
import { Listing } from '../../../utils/interfaces';

const ListingsPage: NextPage<{ listing: Listing }> = ({ listing }) => {
  const { isMobile } = useBreakpoints();

  return (
    <UILayout
      shouldHideNav={isMobile()}
      pageTitle={`${listing.title} - Book your listing`}
    >
      <div className="relative px-[25px] md:px-[10%] lg:px-[20%] xs:pt-[106px] pb-0 xs:pb-[20px]">
        <UIHeader listing={listing} />
        <div className="flex mt-[32px] gap-12">
          <UIMainListingContent listing={listing} />
          {!isMobile() && <UIStickyReservationWidget listing={listing} />}
        </div>
        <UILocationMap listing={listing} />
        {isMobile() && (
          <UIStickyBottomBanner
            currency={listing.currency}
            pricePerNight={listing.pricePerNight}
          />
        )}
      </div>
    </UILayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  listing: any;
}> = async ctx => {
  const { query } = ctx;
  const listingData = await readFileData();
  const formattedListings = formatListings(JSON.parse(listingData));
  const singleListing = formattedListings.filter(
    listing => listing.id === query.id
  )[0];

  return {
    props: {
      listing: singleListing,
    },
  };
};

export default ListingsPage;
