import { useState } from 'react';
import { FaHouseUser, FaStar } from 'react-icons/fa';
import { UIStarRating } from 'ui-kit/star-rating';
import { Listing } from 'utils/interfaces';

enum RatingsEnum {
  'accuracy' = 'Accuracy',
  'checkin' = 'Check In',
  'cleanliness' = 'Cleanliness',
  'communication' = 'Communication',
  'location' = 'Location',
  'value' = 'Value',
  'guestSatisfactionOverall' = 'Overall',
}

export const UIMainListingContent: React.FC<{ listing: Listing }> = ({
  listing,
}) => {
  const [descriptionExpanded, toggleDescription] = useState<boolean>(false);
  const [amenitiesExpanded, toggleAmenities] = useState<boolean>(false);

  const availableAmenities = listing.amenities.data.filter(
    amenity => amenity.available
  );

  return (
    <div className="w-[100%] xs:w-[55%] lg:w-[65%]">
      {/*host info and room types*/}
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
