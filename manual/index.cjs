const { parse } = require("node-html-parser");
const path = require("path");
const fs = require("fs");
const links = [
  "https://mechvibes.com/sound-packs/sound-pack-1200000000001",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000002",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000003",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000004",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000005",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000006",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000007",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000008",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000009",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000010",
  "https://mechvibes.com/sound-packs/sound-pack-1200000000012",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000038",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000041",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000081",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000021",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000079",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000016",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000073",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000052",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000049",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000066",
  "https://mechvibes.com/sound-packs/custom-sound-pack-1203000000033",
];

const promises = links.map(async (link) => {
  const res = await fetch(link);
  const html = await res.text();
  const dom = parse(html);

  return dom
    .querySelectorAll("a")
    .filter((a) => a.getAttribute("href").includes(".zip"))
    .map((a) => "wget https://mechvibes.com" + a.getAttribute("href"));
});

Promise.all(promises).then((data) => {
  console.log(data.join("\n"));
});
