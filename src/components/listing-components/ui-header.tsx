import { useBreakpoints } from 'hooks/breakpoints';
import { FaMedal, FaStar } from 'react-icons/fa';
import { Listing } from 'utils/interfaces';
import { UIGallery } from './ui-gallery';

export const UIHeader: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { isMobile } = useBreakpoints();
  return (
    <>
      {!isMobile() && <UIHeaderDetails listing={listing} />}
      <UIGallery images={listing.images} />
      {isMobile() && <UIHeaderDetails listing={listing} />}
    </>
  );
};

const UIHeaderDetails: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div>
      <h1 className="font-semibold mb-[8px]">{listing.title}</h1>
      <p className="flex items-center mb-[8px] gap-1">
        <FaStar />
        <span>{listing.ratings.value}</span>
        &#x2022;
        <span>{listing.reviewCount} reviews</span>
        {!listing.host?.isSuperhost && (
          <>
            &#x2022;
            <FaMedal />
            <span>Superhost</span>
          </>
        )}
        &#x2022;
        <span>
          {listing.location.address && `${listing.location.address}, `}
          {listing.location.city}, {listing.location.country.title}
        </span>
      </p>
    </div>
  );
};
