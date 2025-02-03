import assert from "assert";
import { clean, valid } from "semver";
import fs from "fs";
import { parse, stringify } from "smol-toml";

const [_version] = process.argv.slice(2);

// Assertions
assert(_version, "Version is required");
assert(valid(_version), "Version must be valid semver");
const version = clean(_version);
console.log(`Releasing version ${version}`);

//  Set package.json version
const packageJson = JSON.parse(fs.readFileSync("package.json"));
packageJson.version = version;
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

// Set Cargo.toml version
const cargoToml = parse(fs.readFileSync("src-tauri/Cargo.toml", "utf-8"));
cargoToml.package.version = version;
fs.writeFileSync("src-tauri/Cargo.toml", stringify(cargoToml));

// Set tauri.conf.json version
const tauriConf = JSON.parse(fs.readFileSync("src-tauri/tauri.conf.json"));
tauriConf.package.version = version;
fs.writeFileSync(
  "src-tauri/tauri.conf.json",
  JSON.stringify(tauriConf, null, 2)
);
