import { useState, useEffect } from 'react';
import { Select, InputForm, PlacesAutocompleteSearch } from './input';
import styles from './inputs.module.scss';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const Inputs = ({
  selected,
  setSelected,
  from,
  setFrom,
  to,
  setTo,
  fromLocation,
  toLocation,
  setFromLocation,
  setToLocation,
  distance,
}: any) => {
  const carPrice = 0.7;
  const truckPrice = 0.5;
  const vanPrice = 0.25;
  let price: number = 0;
  let text = distance?.rows[0]?.elements[0]?.distance.text;
  let value = +text
    ?.slice(0, text.length - 3)
    .split(',')
    .join('');

  price =
    selected === 'Car'
      ? value * carPrice
      : selected === 'Truck'
      ? truckPrice * value
      : vanPrice * value;

  const handleChangeFrom = (address: any) => {
    setFrom(address);
  };

  const handleChangeTo = (address: any) => {
    setTo(address);
  };

  const handleSelect = async (address: any) => {
    try {
      const results = await geocodeByAddress(address);
      setFrom(results[0].formatted_address);
      const latLng = await getLatLng(results[0]);
      setFromLocation(latLng);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectTo = async (address: any) => {
    try {
      const results = await geocodeByAddress(address);
      console.log(results);
      setTo(results[0].formatted_address);
      const latLng = await getLatLng(results[0]);
      setToLocation(latLng);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Select selected={selected} setSelected={setSelected} />
        </div>
        <div className={styles.input}>
          <PlacesAutocompleteSearch
            value={from}
            handleChange={handleChangeFrom}
            handleSelect={handleSelect}
          />
          <PlacesAutocompleteSearch
            value={to}
            handleChange={handleChangeTo}
            handleSelect={handleSelectTo}
          />
        </div>
        <div className={styles.calc}>
          <div className={styles.calc_km}>
            KM: {fromLocation && toLocation && <span>{text}</span>}
          </div>
          <div className={styles.calc_price}>
            Price:{' '}
            {fromLocation && toLocation && (
              <span>{Math.round(price) || '0'}€</span>
            )}
          </div>
        </div>
        {/* <div className={styles.button_wrapper}>
          <button className={styles.button}>Submit</button>
        </div> */}
      </div>
    </div>
  );
};

export default Inputs;
