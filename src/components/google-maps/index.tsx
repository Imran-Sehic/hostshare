import GoogleMapReact from 'google-map-react';
import { FaHouseUser } from 'react-icons/fa';
import { Listing } from 'utils/interfaces';

interface GoogleMapComponentInterface {
  listings: Listing[];
  singleListingMarker?: boolean;
}

const CustomMarker: React.FC<{
  text: string;
  id: string;
  lat: number;
  lng: number;
  singleListingMarker?: boolean;
}> = ({ text, id, singleListingMarker }) => {
  return (
    <>
      {singleListingMarker ? (
        <FaHouseUser size={36} color="white" />
      ) : (
        <div
          className="flex bg-green justify-center items-center w-[50px] py-1 px-2 border border-white text-white rounded-[5px]"
          onClick={() => {
            window.location.href = `/listing/${id}`;
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};

export const GoogleMapComponent: React.FC<GoogleMapComponentInterface> = ({
  listings,
  singleListingMarker,
}) => {
  const centerLat =
    listings
      .map(listing => listing.location.lat)
      .reduce((acc, cur) => acc + cur, 0) / listings.length;

  const centerLng =
    listings
      .map(listing => listing.location.long)
      .reduce((acc, cur) => acc + cur, 0) / listings.length;

  const defaultProps = {
    center: {
      lat: centerLat,
      lng: centerLng,
    },
    zoom: 10,
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {listings &&
          listings
            .slice(0, 5)
            .map(listing => (
              <CustomMarker
                text={`${listing.pricePerNight} ${listing.currency.symbol}`}
                id={listing.id}
                lat={listing.location.lat}
                lng={listing.location.long}
                singleListingMarker={singleListingMarker}
              />
            ))}
      </GoogleMapReact>
    </div>
  );
};
