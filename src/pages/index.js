import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import React from "react";
import PropTypes from "prop-types";
import getPlaces from "@lib/getPlaces";
import getTypes from "@lib/getTypes";
import getLocations from "@lib/getLocations";
import Places from "@lists/Places";
import Types from "@lists/Types";
import Locations from "@lists/Locations";


export default function Home({ places, types, locations }) {
  return (
    <div className="container">
      <Head>
        <title>SBiS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="SBiS" />
        <h2>Platser där det skjuts</h2>
        <Places places={places} />
        <h2>Sätt att skjuta</h2>
        <Types types={types} />
        <h2>Orter där det skjuts</h2>
        <Locations locations={locations} />
      </main>
      <Footer />
    </div>
  )
}

Home.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      longest: PropTypes.number.isRequired,
    })
  ).isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export async function getStaticProps() {
  return {
    props: {
      places: await getPlaces(),
      types: await getTypes(),
      locations: await getLocations(),
    },
  };
}
