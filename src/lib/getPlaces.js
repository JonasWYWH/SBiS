const Airtable = require('airtable');


const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app71VeZADw2YjRBo"
);

export default function getPlaces() {
  const totalRecords = [];

  return new Promise((resolve, reject) => {
    base("places")
      .select({
        fields: ["name","longest","url", "location_url"],
        sort: [{ field: "name", direction: "desc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            const id = record.getId();
            const url = record.get('location_url') + "/" + record.get('url');
            const name = record.get("name");
            const longest = record.get("longest");

            if (!name || !longest) return;

            totalRecords.push({
              id,
              url,
              name,
              longest,
            });
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) return reject(err);

          return resolve(totalRecords);
        }
      );
  });
}