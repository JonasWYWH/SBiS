import getLocations from "@lib/getLocations";
import getLocation from "@lib/getLocation";

export async function getStaticPaths() {
  const locations = await getLocations();

  if (!locations || locations.length === 0) {
    return { paths: [], fallback: false };
  }

  // Kontrollera att varje plats har en 'location_url'
  const paths = locations.map(location => {
    if (location.location_url) {
      return {
        params: { locationURL: `${location.location_url}` }
      };
    } else {
      // Hantera fall där 'location_url' eller 'url' saknas
      console.error('Missing location_url:', location);
    }
  }).filter(Boolean); // Filter out any undefined entries

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  // Splitting the URL to extract the specific place URL part
  
  const location = await getLocation({ location_url: params.locationURL });

  if (!location) {
    return { notFound: true };
  }

  return { props: location };
}

  export default function Location({ name }) {
    
    return (
        <div>
          <h1>{ name }</h1>
        </div>
    )
  }
