console.time("Time taken");
var fs = require("fs");
var index = require("./index.js");

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [k, v] = arg.split("=");
  acc[k] = v;
  return acc;
}, {});

if (!fs.existsSync(`${args["input"]}.txt`)) {
  console.log("The input file you specified does not exist.");
  console.timeEnd("Time taken");
  process.exit();
}
if (args["output"] == undefined) {
  console.log("You did not specify an output file name. Please try again.");
  console.timeEnd("Time taken");
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
  console.log("Your GPX route has been saved.");
  console.timeEnd("Time taken");
}

if (fs.existsSync(`${args["output"]}.gpx`)) {
  console.warn("The output file already exists and has been overwritten.");
  saveRoute();
} else {
  saveRoute();
}