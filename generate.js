const C = require("chalk");

console.time(C.magentaBright("Time taken"));
var fs = require("fs");
var index = require("./index.js");

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [k, v] = arg.split("=");
  acc[k] = v;
  return acc;
}, {});

if (!fs.existsSync(`${args["input"]}.txt`)) {
  console.error(C.redBright("The input file you specified does not exist."));
  console.timeEnd(C.magentaBright("Time taken"));
  process.exit();
}
if (args["output"] == undefined) {
  console.error(C.redBright("You did not specify an output file name. Please try again."));
  console.timeEnd(C.magentaBright("Time taken"));
  process.exit();
}

const saveToFile = (data) => {
  fs.writeFile(`${args["output"]}.gpx`, data, (err) => {
  });
};

function saveRoute() {
  const contents = fs.readFileSync(`${args["input"]}.txt`, "utf8");
  const data = index(contents);
  saveToFile(data);
  console.log(C.greenBright("Your GPX route has been saved."));
  console.timeEnd(C.magentaBright("Time taken"));
}

if (fs.existsSync(`${args["output"]}.gpx`)) {
  console.warn(C.hex("#FFA500")("The output file already exists and has been overwritten."));
  fs.unlinkSync(`${args["output"]}.geojson`); // Delete the existing geojson file if the user has installed the Geo Data Viewer on Visual Studio Code and decides to preview the map (The extension does not delete the previous GEOJSON file)
  saveRoute();
} else {
  saveRoute();
}