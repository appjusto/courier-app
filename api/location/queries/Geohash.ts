/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   (c) Chris Veness 2014-2019 / MIT Licence  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map

/**
 * Geohash: Gustavo Niemeyer’s geocoding system.
 */
class Geohash {
  /**
   * Encodes latitude/lnggitude to geohash, either to specified precision or to automatically
   * evaluated precision.
   * @example
   *     const geohash = Geohash.encode(52.205, 0.119, 7); // => 'u120fxw'
   */
  static encode(lat?: number, lng?: number, precision: number = 12): string | null {
    // infer precision?
    if (!lat || !lng) return null;
    // if (typeof precision == "undefined") {
    //   // refine geohash until it matches precision of supplied lat/lng
    //   for (let p = 1; p <= 12; p++) {
    //     const hash = Geohash.encode(lat, lng, p);
    //     const posn = Geohash.decode(hash!);
    //     if (posn.lat == lat && posn.lng == lng) return hash;
    //   }
    //   precision = 12; // set to maximum
    // }

    // lat = Number(lat);
    // lng = Number(lng);
    // precision = Number(precision);

    // if (isNaN(lat) || isNaN(lng) || isNaN(precision))
    //   throw new Error("Invalid geohash");

    let idx = 0; // index into base32 map
    let bit = 0; // each char holds 5 bits
    let evenBit = true;
    let geohash = '';

    let latMin = -90,
      latMax = 90;
    let lngMin = -180,
      lngMax = 180;

    while (geohash.length < precision) {
      if (evenBit) {
        // bisect E-W lnggitude
        const lngMid = (lngMin + lngMax) / 2;
        if (lng >= lngMid) {
          idx = idx * 2 + 1;
          lngMin = lngMid;
        } else {
          idx = idx * 2;
          lngMax = lngMid;
        }
      } else {
        // bisect N-S latitude
        const latMid = (latMin + latMax) / 2;
        if (lat >= latMid) {
          idx = idx * 2 + 1;
          latMin = latMid;
        } else {
          idx = idx * 2;
          latMax = latMid;
        }
      }
      evenBit = !evenBit;

      if (++bit === 5) {
        // 5 bits gives us a character: append it and start over
        geohash += base32.charAt(idx);
        bit = 0;
        idx = 0;
      }
    }

    return geohash;
  }

  /**
   * Decode geohash to latitude/lnggitude (location is approximate centre of geohash cell,
   *     to reasonable precision).
   * @example
   *     const latlng = Geohash.decode('u120fxw'); // => { lat: 52.205, lng: 0.1188 }
   */
  static decode(geohash: string): { lat: number; lng: number } {
    const bounds = Geohash.bounds(geohash); // <-- the hard work
    // now just determine the centre of the cell...

    const latMin = bounds.sw.lat,
      lngMin = bounds.sw.lng;
    const latMax = bounds.ne.lat,
      lngMax = bounds.ne.lng;

    // cell centre
    const lat = (latMin + latMax) / 2;
    const lng = (lngMin + lngMax) / 2;

    // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
    const stringLat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10));
    const stringLng = lng.toFixed(Math.floor(2 - Math.log(lngMax - lngMin) / Math.LN10));

    return { lat: Number(stringLat), lng: Number(stringLng) };
  }

  /**
   * Returns SW/NE latitude/lnggitude bounds of specified geohash.
   */
  static bounds(geohash: string): {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  } {
    if (geohash.length === 0) throw new Error('Invalid geohash');

    geohash = geohash.toLowerCase();

    let evenBit = true;
    let latMin = -90,
      latMax = 90;
    let lngMin = -180,
      lngMax = 180;

    for (let i = 0; i < geohash.length; i++) {
      const chr = geohash.charAt(i);
      const idx = base32.indexOf(chr);
      if (idx === -1) throw new Error('Invalid geohash');

      for (let n = 4; n >= 0; n--) {
        const bitN = (idx >> n) & 1;
        if (evenBit) {
          // lnggitude
          const lngMid = (lngMin + lngMax) / 2;
          if (bitN === 1) {
            lngMin = lngMid;
          } else {
            lngMax = lngMid;
          }
        } else {
          // latitude
          const latMid = (latMin + latMax) / 2;
          if (bitN === 1) {
            latMin = latMid;
          } else {
            latMax = latMid;
          }
        }
        evenBit = !evenBit;
      }
    }

    const bounds = {
      sw: { lat: latMin, lng: lngMin },
      ne: { lat: latMax, lng: lngMax },
    };

    return bounds;
  }

  /**
   * Determines adjacent cell in given direction.
   */
  static adjacent(geohash: string, direction: 'n' | 's' | 'e' | 'w'): string {
    // based on github.com/davetroy/geohash-js

    geohash = geohash.toLowerCase();

    if (geohash.length === 0) throw new Error('Invalid geohash');
    if ('nsew'.indexOf(direction) === -1) throw new Error('Invalid direction');

    const neighbour = {
      n: ['p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx'],
      s: ['14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp'],
      e: ['bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy'],
      w: ['238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb'],
    };
    const border = {
      n: ['prxz', 'bcfguvyz'],
      s: ['028b', '0145hjnp'],
      e: ['bcfguvyz', 'prxz'],
      w: ['0145hjnp', '028b'],
    };

    const lastCh = geohash.slice(-1); // last character of hash
    let parent = geohash.slice(0, -1); // hash without last character

    const type = geohash.length % 2;

    // check for edge-cases which don't share common prefix
    if (border[direction][type].indexOf(lastCh) !== -1 && parent !== '') {
      parent = Geohash.adjacent(parent, direction);
    }

    // append letter for direction to parent
    return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
  }

  /**
   * Returns all 8 adjacent cells to specified geohash.
   */
  static neighbours(geohash: string) {
    return {
      n: Geohash.adjacent(geohash, 'n'),
      ne: Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'e'),
      e: Geohash.adjacent(geohash, 'e'),
      se: Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'e'),
      s: Geohash.adjacent(geohash, 's'),
      sw: Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'w'),
      w: Geohash.adjacent(geohash, 'w'),
      nw: Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'w'),
    };
  }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

export default Geohash;
