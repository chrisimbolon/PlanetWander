/* eslint-disable react/prop-types */

import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  console.log("CityList: isLoading:", isLoading); // Add this
  console.log("CityList: cities:", cities); // Add this
  if (isLoading) return <Spinner />;
  console.log("Cities in CityList:", cities);
  if (!cities.length)
    return <Message message="Add first city by clicking a  on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
