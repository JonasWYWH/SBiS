const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app71VeZADw2YjRBo"
);

export default function getLocations() {
  const totalRecords = [];

  return new Promise((resolve, reject) => {
    base("locations")
      .select({
        fields: ["name"],
        sort: [{ field: "name", direction: "desc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            const id = record.getId();
            const name = record.get("name");

            if (!name) return;

            totalRecords.push({
              id,
              name,
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