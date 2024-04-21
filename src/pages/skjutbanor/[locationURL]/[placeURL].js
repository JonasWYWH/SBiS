import getPlaces from "@lib/getPlaces";
import getPlace from "@lib/getPlace";

export async function getStaticPaths() {
  const places = await getPlaces();

  if (!places || places.length === 0) {
    return { paths: [], fallback: false };
  }

  // Kontrollera att varje plats har en 'location_url' och 'url'
  const paths = places.map(place => {
    if (place.location_url && place.url) {
      return {
        params: { placeURL: `${place.location_url}/${place.url}` }
      };
    } else {
      // Hantera fall där 'location_url' eller 'url' saknas
      console.error('Missing location_url or url for place:', place);
    }
  }).filter(Boolean); // Filter out any undefined entries

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  // Splitting the URL to extract the specific place URL part
  const urlParts = params.placeURL.split('/'); // Changed 'locationURL' to 'placeURL'
  const placeURL = urlParts[urlParts.length - 1]; // Assuming the place URL is the last part

  const place = await getPlace({ url: placeURL });

  if (!place) {
    return { notFound: true };
  }

  return { props: place };
}

  export default function Place({ name, latitude, longitude }) {
    
    return (
        <div>
          <h1>{ name }</h1>
          <p>{ latitude }</p>
          <p>{ longitude }</p>
        </div>
    )
  }
