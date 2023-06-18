import { useLoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import { Listing } from '../../utils/interfaces';

interface GoogleMapComponentInterface {
  listings: Listing[];
}

const CustomMarker: React.FC<{ text: string; id: string }> = ({ text, id }) => {
  return (
    <div
      className="flex bg-green w-[50px] py-1 px-2 border border-white text-white rounded-[5px]"
      onClick={() => {
        window.location.href = `/listing/${id}`;
      }}
    >
      {text}
    </div>
  );
};

export const GoogleMapComponent: React.FC<GoogleMapComponentInterface> = ({
  listings,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>...Loading</div>;

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
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
        {listings &&
          listings
            .slice(0, 5)
            .map(listing => (
              <CustomMarker
                text={`${listing.pricePerNight} ${listing.currency.symbol}`}
                id={listing.id}
                lat={listing.location.lat}
                lng={listing.location.long}
              />
            ))}
      </GoogleMapReact>
    </div>
  );

  // return (
  //   <GoogleMap
  //     zoom={10}
  //     center={{ lat: centerLat, lng: centerLng }}
  //     mapContainerStyle={{ width: '100%', height: '100%' }}

  //   >
  //     {listings &&
  //       listings.slice(0, 5).map(listing => (
  //         <Marker
  //           position={{
  //             lat: listing.location.lat,
  //             lng: listing.location.long,
  //           }}
  //           onClick={() => {
  //             window.location.href = `/listing/${listings[0].id}`;
  //           }}

  //         >
  //           <div>
  //             <p>{listing.pricePerNight}</p>
  //           </div>
  //         </Marker>
  //       ))}
  //   </GoogleMap>
  // );
};
