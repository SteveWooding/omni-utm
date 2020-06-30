import {
  getEasting, getNorthing, getZone, getHemisphere, getUtmStr
} from './utm.js';

const lat = 50.06045;
const long = 19.93242;

console.log(getZone(lat, long)); // 34
console.log(getHemisphere(lat, long)); // 1
console.log(getEasting(lat, long)); // 5545898
console.log(getNorthing(lat, long)); // 423586
console.log(getUtmStr(lat, long)); // '34 N 423586 5545898'
