import { Listing } from '../../utils/interfaces';
import { GoogleMapComponent } from '../google-maps';

export const UILocationMap: React.FC<{ listing: Listing }> = ({ listing }) => {
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
