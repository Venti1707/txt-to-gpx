const C = require("chalk");

console.time(C.magentaBright("Time taken"));
var fs = require("fs");
var index = require("./index.js");

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [k, v] = arg.split("=");
  acc[k.toLowerCase()] = v;
  return acc;
}, {});

if (!fs.existsSync(`${args["input"]}.txt`)) {
  console.error(C.redBright("The input file you specified does not exist."));
  console.timeEnd(C.magentaBright("Time taken"));
  process.exit();
}
if (args["output"] === undefined) {
  const inputFileName = args["input"].split(".")[0];
  args["output"] = inputFileName;
  console.warn(C.hex("#FFA500")(`You did not specify an output file name. The input file name has been used as a default.`));
}

const saveToFile = (data) => {
  fs.writeFile(`${args["output"]}.gpx`, data, (err) => {
    if (err) throw err;
    console.log(C.greenBright("Your GPX route has been saved."));
    console.timeEnd(C.magentaBright("Time taken"));
  });
};

function saveRoute() {
  const contents = fs.readFileSync(`${args["input"]}.txt`, "utf8");
  const data = index(contents);
  saveToFile(data);
}

if (fs.existsSync(`${args["output"]}.gpx`)) {
  console.warn(C.hex("#FFA500")("The output file already exists and has been overwritten."));

  // The following code is used to check if there is an existing GeoJSON file if the user has installed the
  // Geo Data Viewer extension on Visual Studio Code and decides to preview the map
  // (The extension does not delete the previous GeoJSON file)

  if (fs.existsSync(`${args["output"]}.geojson`)) {
    fs.unlinkSync(`${args["output"]}.geojson`);
    saveRoute();
  } else {
    saveRoute();
  }
} else {
  saveRoute();
}