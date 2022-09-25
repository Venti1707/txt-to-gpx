const C = require('chalk');

// Comment out this function if you accept multiple of the same values
function uniqueResults(value, index, self) {
  return self.indexOf(value) === index;
}

const generateGPX = (sortedArray) =>
  `<?xml version="1.0" encoding="utf-8"?>
<gpx version="1.1">
\t<rte>
${sortedArray
    .map((p) => {
      var [lat, lon] = p.split(",");
      lat = lat.trim();
      lon = lon.trim();

      // Check for empty lines
      if (lat.length === 0 && lon.length === 0) {
        console.error(C.redBright("There is an empty line somewhere, please check  your input file again."));
        process.exit();
      }

      // Check for errors within latitude values
      if (lat.length === 0) {
        console.error(C.redBright("There is a missing latitude value somewhere, please check your input file again."));
        process.exit();
      }

      if (isNaN(lat)) {
        console.error(C.redBright("One of the latitude values is not a number, please check your input file again."));
        process.exit();
      }

      if (lat > 90 || lat < -90) {
        console.error(C.redBright("One of the latitude values falls outside the acceptable range, please check your input file again."));
        process.exit();
      }

      // Check for errors within longitude values
      if (lon.length === 0) {
        console.error(C.redBright("There is a missing longitude value somewhere, please check your input file again."));
        process.exit();
      }

      if (isNaN(lon)) {
        console.error(C.redBright("One of the longitude values is not a number, please check your input file again."));
        process.exit();
      }

      if (lon > 180 || lat < -180) {
        console.error(C.redBright("One of the longitude values falls outside the acceptable range, please check your input file again."));
        process.exit();
      }

      return `\t\t<rtept lat="${+lat}" lon="${+lon}"></rtept>`;

    })
    .join(`\n`)
  }
\t</rte>

${sortedArray
    .map((p) => {
      var [lat, lon, loc] = p.split(",");
      lat = lat.trim();
      lon = lon.trim();
      loc = loc.trim();


      if (lat.length === 0 && lon.length === 0 && loc.length === 0) {
        console.error(C.redBright("There is an empty line somewhere, please check  your input file again."));
        process.exit();
      }

      // Check for errors within latitude values
      if (lat.length === 0) {
        console.error(C.redBright("There is a missing latitude value somewhere, please check your input file again."));
        process.exit();
      }

      if (isNaN(lat)) {
        console.error(C.redBright("One of the latitude values is not a number, please check your input file again."));
        process.exit();
      }

      if (lat > 90 || lat < -90) {
        console.error(C.redBright("One of the latitude values falls outside the acceptable range, please check your input file again."));
        process.exit();
      }

      // Check for errors within longitude values
      if (lon.length === 0) {
        console.error(C.redBright("There is a missing longitude value somewhere, please check your input file again."));
        process.exit();
      }

      if (isNaN(lon)) {
        console.error(C.redBright("One of the longitude values is not a number, please check your input file again."));
        process.exit();
      }

      if (lon > 180 || lat < -180) {
        console.error(C.redBright("One of the longitude values falls outside the acceptable range, please check your input file again."));
        process.exit();
      }

      if (loc.length === 0) {
        console.error(C.redBright("There is a missing location somewhere, please check your input file again."));
        process.exit();
      }

        return `\t<wpt lat="${+lat}" lon="${+lon}">\n\t\t<name>${loc.trim()}</name>\n\t</wpt>`;;
    })
    .join(`\n`)
  }
</gpx>`;


const GPX = (contents) => {
  const coordsArray = contents.split("\r\n").filter(uniqueResults); // Comment out .filter(unique) if you accept multiple of the same values
  var sortedArray;
  sortedArray = coordsArray.map((coords) => {
    const [lat, lon, loc] = coords.split(",");
    return `${lat},${lon},${loc}`;
  });

  return generateGPX(sortedArray);
};

module.exports = GPX;