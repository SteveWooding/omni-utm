import {
  getEasting, getNorthing, getZone, getHemisphere, getUtmStr, getGZD
} from './utm.js';

/*
 * DATA (vSetter/vSelect/other)
 */
const hemisphereVSelect = omni.createValueSelect({
  north: { name: 'North', value: 1 },
  south: { name: 'South', value: -1 }
});

const eastOrWestVSelect = omni.createValueSelect({
  north: { name: 'East', value: 1 },
  south: { name: 'West', value: -1 }
});

const coordInputVSelect = omni.createValueSelect({
  deg: { name: 'Decimal Degrees', value: 0 },
  degMinSec: { name: 'Deg/Min/Sec', value: 1 }
});

/*
 * Initialization of Calculator (might trigger onResults)
 */
omni.onInit((ctx) => {
  ctx.bindValueSelect(hemisphereVSelect, 'hemisphere');
  ctx.bindValueSelect(hemisphereVSelect, 'hemisphereDMS');
  ctx.bindValueSelect(hemisphereVSelect, 'latNorthOrSouth');
  ctx.bindValueSelect(eastOrWestVSelect, 'longEastOrWest');
  ctx.bindValueSelect(coordInputVSelect, 'inputMode');

  ctx.setDefault('inputMode', 0);
});

/*
 * Show/hide the two different input modes (degrees and deg/min/sec)
 */
omni.onResult(['inputMode'], (ctx, inputMode) => {
  ctx.hideVariables('latDMSSigned', 'longDMSSigned');
  ctx.hideVariables(
    'latitude', 'longitude', 'latNorthOrSouth', 'longEastOrWest', 'latDMS',
    'longDMS'
  );
  ctx.hideVariables(
    'northing', 'easting', 'zone', 'hemisphere', 'northingDMS', 'eastingDMS',
    'zoneDMS', 'hemisphereDMS'
  );

  switch (inputMode.toNumber()) {
    case 0:
      ctx.showVariables(
        'latitude', 'longitude', 'northing', 'easting', 'zone', 'hemisphere'
      );
      break;
    case 1:
      ctx.showVariables(
        'latNorthOrSouth', 'longEastOrWest', 'latDMS', 'longDMS', 'northingDMS',
        'eastingDMS', 'zoneDMS', 'hemisphereDMS'
      );
      break;
    default:
      break;
  }

});

/*
 * Show full UTM - Decimal degree mode
 */
omni.onResult(['latitude', 'longitude'], (ctx, lat, long) => {
  const inputMode = ctx.getNumberValue('inputMode');

  if (inputMode === 0) {
    outputHtml(ctx, lat, long);
  }

});

/*
 * Show full UTM - Degree, minute, second mode
 */
omni.onResult(['latDMSSigned', 'longDMSSigned'], (ctx, lat, long) => {
  const inputMode = ctx.getNumberValue('inputMode');

  if (inputMode === 1) {
    outputHtml(ctx, lat, long);
  }

});

/*
 * Show full UTM
 */
function outputHtml(ctx, lat, long) {
  const utmStr = getUtmStr(lat, long);
  const gzd = getGZD(lat, long);

  if (utmStr && gzd) {
    ctx.addHtml(
      `<center>UTM coordinate: <b>${utmStr}</b></center>`
    );
    ctx.addHtml(
      `<center>Grid Zone Designator (GZD): <b>${gzd}</b></center>`
    );
  }
}

/*
 * getEasting - Returns the easting number of UTM, given a lat and long position.
 */
omni.define(
  'getEasting',
  (latitude, longitude) => getEasting(latitude, longitude)
);

/*
 * getNorthing - Returns the northing number of UTM, given a lat and long position.
 */
omni.define(
  'getNorthing', (latitude, longitude) => getNorthing(latitude, longitude)
);

/*
 * getZone - Returns the zone of UTM, given a lat and long position.
 */
omni.define(
  'getZone', (latitude, longitude) => getZone(latitude, longitude)
);

/*
 * getGZD - Returns the grid zone designator (GZD), given a lat and long position.
 */
omni.define(
  'getGZD', (latitude, longitude) => getGZD(latitude, longitude)
);

/*
 * getHemisphere - Returns the zone of UTM, given a lat and long position.
 */
omni.define(
  'getHemisphere', (latitude, longitude) => getHemisphere(latitude, longitude)
);

/*
 * checkNorthernLatLimit - Custom condition checks the northern latitude limit of UTM.
 */
omni.define(
  'checkNorthernLatLimit', (latDMS, latNorthOrSouth) => {
    if (latNorthOrSouth.toNumber() === 1 && latDMS.toNumber() >= 84 * 3600) {
      return false;
    }
    return true;
  }
);

/*
 * checkSouthernLatLimit - Custom condition checks the southern latitude limit of UTM.
 */
omni.define(
  'checkSouthernLatLimit', (latDMS, latNorthOrSouth) => {
    if (latNorthOrSouth.toNumber() === -1 && latDMS.toNumber() > 80 * 3600) {
      return false;
    }
    return true;
  }
);
