# What is this?
This is a JavaScript program that was derived from [here](https://gitlab.com/3nvy/gpx-route-generator-console) to help convert a text file which contains values that are separated by commas into a GPX file that contains the values as a route (```<rte>```), a track (```<trk>```) and a waypoint (```<wpt>```) with the location (```<name>```).

# How should the text file look like?
The program *should* pick up any issues with the text file, but this is how you should format the text files
```txt
LatitudeOfPoint1,LongitudeOfPoint1,LocationOfPoint1
LatitudeOfPoint2,LongitudeOfPoint2,LocationOfPoint2
...
```

# What are the accepted values?
*  Latitude **must be** ≥ -90 or ≤ 90 (Decimals allowed.)
* Longitude **must be** ≥ -180 or ≤ 180 (Decimals allowed.)
* Location name *should* accept all values
* All duplicate values will be removed unless stated otherwise. Refer to line 115 of [index.js](index.js) if you wish to accept duplicate values.

# How will the output look like?
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- GPX begins -->
<gpx version="1.1">
	<!-- Route begins -->
	<rte>
		<!-- Route point begins -->
		<rtept lat="LatitudeOfPoint1" lon="LongitudeOfPoint1"></rtept>
		<rtept lat="LatitudeOfPoint2" lon="LongitudeOfPoint2"></rtept>
		<!-- More <rtept> tags here  -->
		<!-- Route point ends -->
	</rte>
	<!-- Route ends -->

	<!-- Track begins -->
	<trk>
		<!-- Track point begins -->
		<trkpt lat="LatitudeOfPoint1" lon="LongitudeOfPoint1"></trkpt>
		<trkpt lat="LatitudeOfPoint2" lon="LongitudeOfPoint2"></trkpt>
		<!-- More <trkpt> tags here -->
		<!-- Track point ends -->
	</trk>
	<!-- Track ends -->

	<!-- Waypoints and name begins -->
	<wpt lat="LatitudeOfPoint1" lon="LongitudeOfPoint1">
		<name>LocationOfPoint1</name>
	</wpt>
	<wpt lat="LatitudeOfPoint2" lon="LongitudeOfPoint2">
		<name>LocationOfPoint2</name>
	</wpt>
    <!-- More <wpt> and <name> tags here -->
	<!-- Waypoints and name ends -->
</gpx>
<!-- GPX ends -->
```

# How do I begin using the program?
* Download Node.js [here](https://nodejs.org/en/)
* Clone the repository
* Use ```node generate input=INPUT_FILE_NAME output=OUTPUT_FILE_NAME``` to generate the GPX file
    * ```INPUT_FILE_NAME``` is the name of the file to read the coordinates from; It **must** be a .txt file
    * ```OUTPUT_FILE_NAME``` is the name of the output file

# Known bugs
* None so far!