import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  // console.log(countries);
  const [keywords,setKeywords] = useState('')
 

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keywords.toLowerCase()) ||
      country.region.toLowerCase().includes(keywords.toLowerCase()) ||
      country.subregion.toLowerCase().includes(keywords.toLowerCase()) ||
      country.capital.toLowerCase().includes(keywords.toLowerCase())
  );

   const onInputChange = (e) => {
     let value = e.target.value;
     setKeywords(value);
   };

  return (
    <Layout>
      <div className="styles.inputContainer">
        <div className={styles.counts}>
          Found {filteredCountries.length} countries
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Search by Name, Region , Subregion or Capital"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
