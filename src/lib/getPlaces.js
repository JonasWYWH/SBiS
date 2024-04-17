const Airtable = require('airtable');


const base = new Airtable({ apiKey: "patsm7QZ4OXkFlJZW.fafccc4c6bc62f70183c694a7bf93e6d8fab00e545433d232b09357d93b9db35" }).base(
  "app71VeZADw2YjRBo"
);

export default function getPlaces() {
  const totalRecords = [];

  return new Promise((resolve, reject) => {
    base("places")
      .select({
        fields: ["name", "longest"],
        sort: [{ field: "name", direction: "desc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            const id = record.getId();
            const name = record.get("name");
            const longest = record.get("longest");

            if (!name || !longest) return;

            totalRecords.push({
              id,
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