const C = require('chalk');

// Comment out this function if you accept multiple of the same values
function uniqueResults(value, index, self) {
  return self.indexOf(value) === index;
}

const generateGPX = (sortedArray) =>
  `<?xml version="1.0" encoding="utf-8"?>
<!-- GPX begins -->
<gpx version="1.1">
\t<!-- Route begins -->
\t<rte>
\t\t<!-- Route point begins -->
${sortedArray
    .map((p) => {
      var [lat, lon] = p.split(",");
      lat = lat.trim();
      lon = lon.trim();

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
\t\t<!-- Route point ends -->
\t</rte>
\t<!-- Route ends -->

\t<!-- Track begins -->
\t<trk>
\t\t<!-- Track point begins -->
${sortedArray
    .map((p) => {
      var [lat, lon] = p.split(",");
      lat = lat.trim();
      lon = lon.trim();

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

      return `\t\t<trkpt lat="${+lat}" lon="${+lon}"></trkpt>`;

    })
    .join(`\n`)
  }
\t\t<!-- Track point ends -->
\t</trk>
\t<!-- Track ends -->

\t<!-- Waypoints and name begins -->
${sortedArray
    .map((p) => {
      var [lat, lon, loc] = p.split(",");
      lat = lat.trim();
      lon = lon.trim();
      loc = loc.trim();

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

      // Check for errors within location values
      if (loc == "undefined") {
        console.log(C.redBright("There is a missing location somewhere, please check your input file again."));
        process.exit();
      }

      return `\t<wpt lat="${+lat}" lon="${+lon}">\n\t\t<name>${loc.trim()}</name>\n\t</wpt>`;
    })
    .join(`\n`)
  }
\t<!-- Waypoints and name ends -->
</gpx>
<!-- GPX ends -->`;


const GPX = (contents) => {
  const coordsArray = contents.split("\r\n").filter(uniqueResults); // Comment out .filter(uniqueResults) if you accept duplicate values
  var sortedArray;
  sortedArray = coordsArray.map((coords) => {
    const [lat, lon, loc] = coords.split(",");
    return `${lat},${lon},${loc}`;
  });

  return generateGPX(sortedArray);
};

module.exports = GPX;