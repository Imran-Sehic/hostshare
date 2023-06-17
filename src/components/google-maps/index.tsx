import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Listing } from '../../utils/interfaces';

interface GoogleMapComponentInterface {
  listings: Listing[];
}

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

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: centerLat, lng: centerLng }}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      {listings &&
        listings.slice(0, 5).map(listing => (
          <Marker
            position={{
              lat: listing.location.lat,
              lng: listing.location.long,
            }}
            onClick={() => {
              window.location.href = `/listing/${listings[0].id}`;
            }}
          />
        ))}
    </GoogleMap>
  );
};
