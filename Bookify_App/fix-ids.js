const fs = require("fs");

const raw = fs.readFileSync("db.json", "utf-8");
const data = JSON.parse(raw);

data.venues = data.venues.map((v) => ({
    ...v,
    id: Number(v.id),
}));

fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
console.log("✅ ID fields converted to numbers!");
