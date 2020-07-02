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

/*
 * Initialization of Calculator (might trigger onResults)
 */
omni.onInit((ctx) => {
  ctx.bindValueSelect(hemisphereVSelect, 'hemisphere');
});

/*
 * Show full UTM
 */
omni.onResult(['latitude', 'longitude'], (ctx, lat, long) => {
  const utmStr = getUtmStr(lat, long);
  const gzd = getGZD(lat, long);

  ctx.addHtml(
    `<center>UTM coordinate: <b>${utmStr}</b></center>`,
    { afterVariable: 'northing' }
  );
  ctx.addHtml(
    `<center>Grid Zone Designator (GZD): <b>${gzd}</b></center>`,
    { afterVariable: 'northing' }
  );

});

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
