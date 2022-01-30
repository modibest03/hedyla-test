import { Dispatch, SetStateAction, useState } from 'react';
import styles from './input.module.scss';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface SelectTypes {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

interface InputFormTypes {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const Select: React.FC<SelectTypes> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.select_wrapper}>
      <div className={styles.select} onClick={() => setOpen((open) => !open)}>
        <div className={styles.arrow}>
          {open ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
        </div>
        {selected || 'Select'}
      </div>
      {open && (
        <div className={styles.options}>
          <div
            className={`${styles.option} ${
              selected === 'Car' && styles.option_active
            }`}
            onClick={() => {
              setOpen((state) => !state);
              setSelected('Car');
            }}
          >
            Car 0.70€/Km,
          </div>
          <div
            className={`${styles.option} ${
              selected === 'Truck' && styles.option_active
            }`}
            onClick={() => {
              setOpen((state) => !state);

              setSelected('Truck');
            }}
          >
            Truck 0.50€/Km,
          </div>
          <div
            className={`${styles.option} ${
              selected === 'Van' && styles.option_active
            }`}
            onClick={() => {
              setOpen((state) => !state);
              setSelected('Van');
            }}
          >
            Van 0.25€/Km,
          </div>
        </div>
      )}
    </div>
  );
};

export const InputForm: React.FC<InputFormTypes> = ({
  placeholder,
  value,
  setValue,
}) => (
  <div className={styles.input_wrapper}>
    <div className={styles.input_svg}>
      <IoLocationSharp />
    </div>
    <input
      className={styles.input}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export const PlacesAutocompleteSearch = ({
  value,
  handleChange,
  handleSelect,
}: any) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={styles.input_wrapper}>
          <div className={styles.input_svg}>
            <IoLocationSharp />
          </div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={index}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
