import Head from 'next/head'
import Footer from '@components/Footer'
import React from "react";
import PropTypes from "prop-types";
import getPlaces from "@lib/getPlaces";

export default function Places({ places }) {
  return (
    <div className="container">
      <Head>
        <title>SBiS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      {places.map((place) => (
        <div key={place.id}>
            <p>{place.name}</p> &nbsp;
            <p>{place.longest}</p>
        </div>
     ))}
    </main>
      <Footer />
    </div>
    )      
}

Places.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      longest: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export async function getStaticProps() {
  return {
    props: {
      places: await getPlaces(),
    },
  };
}