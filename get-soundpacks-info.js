import fs from "fs";

const results = [];
const dir = fs.readdirSync("./soundpacks");
for (const subdir of dir) {
  if (!fs.lstatSync(`./soundpacks/${subdir}`).isDirectory()) continue;
  const soundpackConfig = JSON.parse(
    fs.readFileSync(`./soundpacks/${subdir}/config.json`)
  );
  results.push({
    id: subdir,
    name: soundpackConfig.name,
    description: soundpackConfig.description,
    author: soundpackConfig.m_author,
    tags: soundpackConfig.tags,
  });
}

console.log(results);
