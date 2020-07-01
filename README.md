# Lat/long to UTM calculator customJS

## Prerequisites

* [Node.js](https://nodejs.org/en/) - version 12.15.0

## Project setup

Please run `npm install` in the root folder of this repository.

## Helpful commands

* `npm run build` - create a version to paste to the bb admin panel. The output file will be available at _dist/omni-bundle.js_.
* `npm run debug` - runs the code in the file _debug.js_, which exercises the code. Also a place to put any debug code and an entry point for the debugger.
* `npm run lint` - lint source code with [ESLint](https://eslint.org/).

## Source files

* _debug.js_ - File for testing and an entry point for the debugger.
* _omni.js_ - Omni Calculator customJS specific code - bindings between the [Geodesy](https://github.com/chrisveness/geodesy) code (which performs the actual lat/long to UTM conversion) and the Omni Calculator UI.
* _utm.js_ - Provides functions that interface between the external Geodesy library and Omni's custom js code.

## Description

Omni customJS code to convert latitude and longitude coordinates (using the WGS84 datum) to Universal Transverse Mercator (UTM) coordinates. Here is an example:

* 50.06045°N, 19.93242°E ➡ 34 N 423586 5545898

Note that this is the strict version of UTM, without the 20 lettered latitude bands that are actually part of the Military Grid Reference System (MGRS).

Copyright 2020 [Omni Calculator](https://www.omnicalculator.com).