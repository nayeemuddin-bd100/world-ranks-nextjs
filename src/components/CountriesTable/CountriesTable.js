/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries,value,direction) => {
    if (direction === "asc") {
      return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  
    }
    
    if (direction === "desc") {
        return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }
    return countries
};

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>
    }
    if (direction === 'desc') {
        
        return (
          <div className={styles.heading_arrow}>
            <ExpandMoreRoundedIcon color="inherit" />
          </div>
        );
    } else {
        return (
          <div className={styles.heading_arrow}>
            <ExpandLessRoundedIcon color="inherit" />
          </div>
        );
    }
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState()
    const [value,setValue] = useState()
    const orderdCountries = orderBy(countries, value, direction);
    
    const switchDirection = () => {
        if (!direction) {
            setDirection('desc')
        } else if (direction === 'desc') {
            setDirection('asc')
        } else {
            setDirection(null)
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection()
        setValue(value)
    }
  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Filter By Name </div>
          <br />

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Filter By Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Filter By Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Filter By Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderdCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
