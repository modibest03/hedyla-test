import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const AutosuggestPlace = () => {
  const [address, setAddress] = useState('');

  const handleSelect = async (value: any) => {};

  return (
    <div>
      {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        <div>

        </div>
      </PlacesAutocomplete> */}
    </div>
  );
};

export default AutosuggestPlace;
