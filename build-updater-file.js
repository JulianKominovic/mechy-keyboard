const fs = require("fs");
const version = require("./package.json").version;
// The json tauri expects is the following:
const updaterJson = {
  version,
  notes: "New update available!",
  pub_date: new Date().toISOString(),
  platforms: {
    "darwin-x86_64": {
      signature: "Content of app.tar.gz.sig",
      url: `https://github.com/JulianKominovic/mechy-keyboard/releases/download/${version}/mechy-keyboard_${version}_-x86_64.app.tar.gz`,
    },
    "darwin-aarch64": {
      signature: "Content of app.tar.gz.sig",
      url: `https://github.com/JulianKominovic/mechy-keyboard/releases/download/${version}/mechy-keyboard_${version}_-aarch64.app.tar.gz`,
    },
    "linux-x86_64": {
      signature: "Content of app.AppImage.tar.gz.sig",
      url: `https://github.com/JulianKominovic/mechy-keyboard/releases/download/${version}/mechy-keyboard_${version}_-amd64.AppImage.tar.gz`,
    },
    "windows-x86_64": {
      signature:
        "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      url: `https://github.com/JulianKominovic/mechy-keyboard/releases/download/${version}/mechy-keyboard_${version}_-x64-setup.nsis.zip`,
    },
  },
};

updaterJson.version = version;
//  Save the file
fs.writeFileSync("updater.json", JSON.stringify(updaterJson, null, 2));
