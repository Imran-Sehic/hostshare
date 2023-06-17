import { RootState } from '@/redux';
import { GetServerSideProps, NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaBuromobelexperte,
  FaHouseUser,
  FaMedal,
  FaStar,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GoogleMapComponent } from '../../../components/google-maps';
import { UIModal } from '../../../components/modal';
import { UILayout } from '../../../core/layout';
import { useBreakpoints } from '../../../hooks/breakpoints';
import { UIStarRating } from '../../../ui-kit/star-rating';
import { formatListings } from '../../../utils/format-listings';
import { Listing, ListingImage } from '../../../utils/interfaces';
import { readFileData } from '../../api/listings';

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
          <UIStickyReservationWidget listing={listing} />
        </div>
        <UILocationMap listing={listing} />
        <UIStickyBottomBanner listing={listing} />
      </div>
    </UILayout>
  );
};

enum RatingsEnum {
  'accuracy' = 'Accuracy',
  'checkin' = 'Check In',
  'cleanliness' = 'Cleanliness',
  'communication' = 'Communication',
  'location' = 'Location',
  'value' = 'Value',
  'guestSatisfactionOverall' = 'Overall',
}

const UIMainListingContent: React.FC<{ listing: Listing }> = ({ listing }) => {
  const [descriptionExpanded, toggleDescription] = useState<boolean>(false);
  const [amenitiesExpanded, toggleAmenities] = useState<boolean>(false);

  const availableAmenities = listing.amenities.data.filter(
    amenity => amenity.available
  );

  return (
    <div className="w-[100%] xs:w-[65%]">
      {/*listing title and room types*/}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-base font-medium">
            {listing.type} - Host:{listing.host?.name}
          </h2>
          <p className="flex gap-1 text-gray-500">
            {listing.capacity} guests{' '}
            {listing.details.data
              .filter(item => item.type !== 'guests')
              .map(roomType => (
                <>
                  &#x2022;
                  <span>
                    {roomType.value} {roomType.type}
                  </span>
                </>
              ))}
          </p>
        </div>
        <img
          src={listing.host?.avatar.url}
          className="w-[40px] h-[40px] rounded-[50%]"
        />
      </div>
      <hr />
      {/*listing description*/}
      <div className="mt-4 mb-4">
        <p
          className={`${
            !descriptionExpanded && 'line-clamp-[10]'
          } mb-2 text-[13px] text-gray-500 font-[100]`}
        >
          {listing.description}
        </p>
        <a
          className="cursor-pointer underline"
          onClick={() => toggleDescription(!descriptionExpanded)}
        >
          {descriptionExpanded ? 'Read Less' : 'Read More'}
        </a>
      </div>
      <hr />
      {/*listing amenities*/}
      <div className="mt-4 mb-4 overflow-clip">
        <h2 className="flex items-center mb-2">
          Amenities <FaHouseUser className="ml-2" />
        </h2>
        <div className="flex flex-wrap mb-2">
          {availableAmenities.slice(0, 10).map(amenity => (
            <div className="p-2 border border-green rounded-[5px] mr-2 mb-2">
              {amenity.title}
            </div>
          ))}
          {amenitiesExpanded &&
            availableAmenities
              .slice(10)
              .map(amenity => (
                <div className="p-2 border border-green rounded-[5px] mr-2 mb-2">
                  {amenity.title}
                </div>
              ))}
        </div>
        {availableAmenities.length > 10 && (
          <a
            className="cursor-pointer underline"
            onClick={() => toggleAmenities(!amenitiesExpanded)}
          >
            {amenitiesExpanded ? 'Show Less' : 'Show More'}
          </a>
        )}
      </div>
      <hr />
      {/*listing ratings*/}
      <div className="mt-4 mb-4">
        <h2 className="flex items-center mb-2">
          Ratings <FaStar className="ml-2" />
        </h2>
        {Object.keys(listing.ratings).map(key => (
          <div className="mb-2">
            <p>{RatingsEnum[key as keyof typeof RatingsEnum]}</p>{' '}
            <UIStarRating
              rating={listing.ratings[key as keyof typeof listing.ratings]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const UILocationMap: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <>
      <hr />
      <div className="mt-4 mb-4">
        <h2 className="mb-2">Location</h2>
        <div className="aspect-[2/1]">
          <GoogleMapComponent listings={[listing]} />
        </div>
      </div>
    </>
  );
};

const UIGalleryModal: React.FC<{
  images: ListingImage[];
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ images, isModalOpen, setIsModalOpen }) => {
  const [index, setIndex] = useState<number>(0);

  const scrollImage = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (index < images.length - 1) {
        setIndex(index => index + 1);
      } else {
        setIndex(0);
      }
    } else {
      if (index > 0) {
        setIndex(index => index - 1);
      } else {
        setIndex(images.length - 1);
      }
    }
  };

  useEffect(() => {
    !isModalOpen && setIndex(0);
  }, [isModalOpen]);

  return (
    <UIModal isModalOpen={isModalOpen}>
      <>
        <button
          onClick={() => {
            setIsModalOpen(false);
            document.body.classList.remove('preventBodyFromScrolling');
          }}
          className="hidden xs:block bg-white absolute right-4 top-4 font-bold"
        >
          Close
        </button>
        <div className="hidden xs:flex justify-between items-center aspect-[3-2] h-[80%] lg:h-[70%] w-[100%] px-5">
          <button onClick={() => scrollImage('left')}>
            <FaAngleDoubleLeft size={24} opacity={0.5} />
          </button>
          <div
            style={{ backgroundImage: `url(${images[index].url})` }}
            className={`mx-6 bg-contain bg-no-repeat bg-center h-[100%] w-[60%] lg:w-[50%] transition-all`}
          ></div>
          <button onClick={() => scrollImage('right')}>
            <FaAngleDoubleRight size={24} opacity={0.5} />
          </button>
        </div>
        <div className="flex xs:hidden fixed bg-white p-4 w-[100%] top-0 font-bold justify-end border-b-2">
          <button
            className="flex items-center font-bold text-[16px]"
            onClick={() => {
              setIsModalOpen(false);
              document.body.classList.remove('preventBodyFromScrolling');
            }}
          >
            Back <FaAngleRight />
          </button>
        </div>
        <div className="flex h-[100%] pt-[60px] flex-col xs:hidden">
          {images.map((image, index) => (
            <div className="m-3">
              <img src={image.url} className="w-[100%]" />
            </div>
          ))}
        </div>
      </>
    </UIModal>
  );
};

const UIGallery: React.FC<{ listing: Listing }> = ({ listing }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="hidden cursor-pointer xs:flex relative aspect-[2/1] rounded-[10px] gap-2 overflow-hidden"
        onClick={() => {
          setIsModalOpen(true);
          document.body.classList.add('preventBodyFromScrolling');
        }}
      >
        <div className="flex-1">
          <img
            src={listing.images[0].url}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
          <div>
            <img
              src={listing.images[1].url}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div>
            <img
              src={listing.images[2].url}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div>
            <img
              src={listing.images[3].url}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div>
            <img
              src={listing.images[4].url}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center items-center border py-1 px-3 rounded-[5px] absolute bg-white bottom-5 right-5">
          <FaBuromobelexperte />
          <p className="ml-2 font-medium">Show all photos</p>
        </div>
      </div>
      <div className="block xs:hidden py-5">
        <p className="flex items-center" onClick={() => history.back()}>
          <FaAngleLeft size={24} />
          <span className="ml-2 text-[14px]">Houses</span>
        </p>
      </div>
      <div
        className="block xs:hidden aspect-[3/2] w-[100vw] ml-[-25px] mb-3"
        onClick={() => {
          setIsModalOpen(true);
          document.body.classList.add('preventBodyFromScrolling');
        }}
      >
        <img
          src={listing.images[0].url}
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
      <UIGalleryModal
        images={listing.images}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const UIHeaderDetails: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <>
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
    </>
  );
};

const UIHeader: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <>
      <div className="hidden xs:block">
        <UIHeaderDetails listing={listing} />
      </div>
      <UIGallery listing={listing} />
      <div className="block xs:hidden">
        <UIHeaderDetails listing={listing} />
      </div>
    </>
  );
};

const UIStickyBottomBanner: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { dateIn, dateOut } = useSelector((state: RootState) => state.filters);
  return (
    <div className="flex w-[100vw] ml-[-25px] z-[50] px-5 py-4 text-[16px] border bg-white justify-between items-center xs:hidden sticky bottom-0">
      <div>
        <p>
          <b>
            {listing.pricePerNight} {listing.currency.symbol}
          </b>{' '}
          night
        </p>
        <p>
          {dateIn} - {dateOut}
        </p>
      </div>
      <button className="bg-green text-white font-bold py-2 px-5 rounded-[5px]">
        Book
      </button>
    </div>
  );
};

const UIStickyReservationWidget: React.FC<{ listing: Listing }> = ({
  listing,
}) => {
  const { dateIn, dateOut } = useSelector((state: RootState) => state.filters);
  const getNumberOfDays = () => {
    const dateInDate = new Date(dateIn);
    const dateOutDate = new Date(dateOut);
    return (
      (dateOutDate.getTime() - dateInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <>
      <div className="hidden xs:block w-[35%]">
        <div className="hidden xs:block p-5 border sticky top-[120px] mb-4 rounded-[10px]">
          <div className="flex justify-between mb-3">
            <p>
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
              <span className="text-gray-500">
                {listing.reviewCount} reviews
              </span>
            </p>
          </div>
          <div className="border border-black rounded-[5px]">
            <div className="grid grid-cols-2 border-b border-black">
              <div className="p-2 border-r border-black">
                <p className="uppercase font-bold text-[8px]">Check-in</p>
                <span>{dateIn}</span>
              </div>
              <div className="p-2">
                <p className="uppercase font-bold text-[8px]">Check-out</p>
                <span>{dateOut}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div>
                <p className="uppercase font-bold text-[8px]">Guests</p>
                <span>1 guest</span>
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
