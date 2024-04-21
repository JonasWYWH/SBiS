// Import necessary modules
import PropTypes from "prop-types";
import Airtable from 'airtable';

// Initialize the Airtable base with an environment variable for the API key
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app71VeZADw2YjRBo"
);

// Function to fetch a place by its URL
export default function getPlace({ url }) {
  return new Promise((resolve, reject) => {
    // Use select to fetch records that match the URL
    base("places").select({
      filterByFormula: `url = '${url}'`
    }).firstPage((err, records) => {
      
      if (err) {
        reject(err);
        return;
      }
      
      // Check if any records were found
      if (records.length === 0) {
        
        reject(new Error('No place found with the given URL'));
        return;
      }
      
      // Assuming the URL is unique and only one record will match
      const record = records[0];

      

      const place = {
        id: record.getId(),
        name: record.get('name'),
        url: record.get('location_url')+"/"+record.get('url'),
        longest: record.get('longest'),
        latitude: record.get('latitude'),
        longitude: record.get('longitude')
      };
      resolve(place);
    });
  });
}