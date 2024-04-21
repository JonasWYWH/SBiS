// Import necessary modules
import Airtable from 'airtable';

// Initialize the Airtable base with an environment variable for the API key
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app71VeZADw2YjRBo"
);

// Function to fetch a place by its URL
export default function getLocation({ location_url }) {
  return new Promise((resolve, reject) => {
    // Use select to fetch records that match the URL
    base("locations").select({
      filterByFormula: `location_url = '${location_url}'`
    }).firstPage((err, records) => {
      
      if (err) {
        reject(err);
        return;
      }
      
      // Check if any records were found
      if (records.length === 0) {
        
        reject(new Error('No location found with the given URL'));
        return;
      }
      
      // Assuming the URL is unique and only one record will match
      const record = records[0];
    
      const location = {
        id: record.getId(),
        name: record.get('name'),
        url: record.get('location_url')
      };
      resolve(location);
    });
  });
}