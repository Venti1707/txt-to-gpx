# What is this?
This is a JavaScript program that was derived from [here](https://gitlab.com/3nvy/gpx-route-generator-console) to help convert a text file which contains values that are separated by commas into a GPX file that contains the values as a route (```<rte>```) and a waypoint with the name (```<wpt>```).

# How should the text file look like?
The program *should* pick up any issues with the text file, but this is how you should format the text files
```txt
LatitudeOfPoint1,LongitudeOfPoint1,Point1WaypointName
LatitudeOfPoint2,LongitudeOfPoint2,Point2WaypointName
...
```

# What are the accepted values?
*  Latitude **must be** ≥ -90 or ≤ 90 (Decimals allowed.)
* Longitude **must be** ≥ -180 or ≤ 180 (Decimals allowed.)
* Waypoint name *should* accept all values
* All duplicate values will be removed unless stated otherwise. Refer to line 115 of [index.js](index.js) if you wish to accept duplicate values.

# How will the output look like?
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1">
    <rte>
        <rtept lat="LatitudeOfPoint1" lon="LongitudeOfPoint1"></rtept>
        <rtept lat="LatitudeOfPoint2" lon="LongitudeOfPoint2"></rtept>
        <.-- More <rtept> tags here -->
    </rte>
    <wpt lat="LatitudeOfPoint1" lon="LongitudeOfPoint1">
        <name>Point1WaypointName</name>
    </wpt>
    <wpt "LatitudeOfPoint2" lon="LongitudeOfPoint2">
        <name>Point2WaypointName</name>
    </wpt>
    <.-- More <wpt> and <name> tags here -->
</gpx>
```

# How do I begin using the program?
* Download Node.js [here](https://nodejs.org/en/)
* Clone the repository
* Use ```node generate input=INPUT_FILE_NAME output=OUTPUT_FILE_NAME``` to generate the GPX file
    * ```INPUT_FILE_NAME``` is the name of the file to read the coordinates from; It **must** be a .txt file
    * ```OUTPUT_FILE_NAME``` is the name of the output file