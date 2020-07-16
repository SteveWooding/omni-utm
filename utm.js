import { LatLon } from 'geodesy/utm.js';
import { Utm } from 'geodesy/mgrs.js';

/*
 * latLonToUtm - Converts lat/lon into UTM.
 */
function latLonToUtm(latitude, longitude) {
  const latLongPos = new LatLon(latitude, longitude);
  try {
    return latLongPos.toUtm();
  } catch (err) {
    return undefined;
  }
}

/*
 * getNorthing - Returns the northing number of UTM, given lat and long.
 */
export function getNorthing(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    return Math.round(utmCoords.northing);
  }
  return undefined;
}

/*
 * getEasting - Returns the easting number of UTM, given a lat and long position.
 */
export function getEasting(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    return Math.round(utmCoords.easting);
  }
  return undefined;
}

/*
 * getZone - Returns the zone of UTM, given a lat and long position.
 */
export function getZone(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    return utmCoords.zone;
  }
  return undefined;
}

/*
 * getGZD - Returns the grid zone designator (GZD), given a lat and long position.
 */
export function getGZD(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    const utmCoordsObj = new Utm(
      utmCoords.zone, utmCoords.hemisphere, utmCoords.easting, utmCoords.northing
    );
    const mgrsRef = utmCoordsObj.toMgrs();
    return mgrsRef.zone + mgrsRef.band;
  }
  return undefined;
}

/*
 * getHemisphere - Returns the hemisphere (north or south),
 * given a lat and long position.
 */
export function getHemisphere(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    if (utmCoords.hemisphere === 'N') {
      return 1;
    }
    if ((utmCoords.hemisphere === 'S')) {
      return -1;
    }
  }
  return undefined;
}

/*
 * getUtmStr - Returns the full UTM string, given a lat and long position.
 */
export function getUtmStr(latitude, longitude) {
  const utmCoords = latLonToUtm(latitude, longitude);
  if (utmCoords) {
    return utmCoords.toString();
  }
  return '';
}
