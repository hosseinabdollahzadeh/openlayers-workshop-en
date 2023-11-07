import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
//! [import]
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
//! [import]
import {Map, View} from 'ol';
import {Stamen, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';

const source = new VectorSource();

const client = new XMLHttpRequest();
client.open('GET', './data/meteorites.csv');
client.onload = function () {
  const csv = client.responseText;
  let curIndex;
  let prevIndex = 0;
  const features = [];

  while ((curIndex = csv.indexOf('\n', prevIndex)) > 0) {
    const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');

    prevIndex = curIndex + 1;
    if (prevIndex === 0) {
      continue; // skip header
    }

    const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);

    features.push(
      new Feature({
        mass: parseFloat(line[1]) || 0,
        year: parseInt(line[2]) || 0,
        geometry: new Point(coords),
      })
    );
  }
  source.addFeatures(features);
};
client.send();

const meteorites = new WebGLPointsLayer({
  source: source,
  style: {
    symbol: {
      symbolType: 'circle',
      //! [size]
      size: [
        '+',
        ['*', ['clamp', ['*', ['get', 'mass'], 1 / 20000], 0, 1], 18],
        8,
      ],
      //! [size]
      color: 'rgb(255, 0, 0)',
      opacity: 0.5,
    },
  },
});

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'toner',
      }),
    }),
    meteorites,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

/**
//! [operator1]
  ['get', 'mass']
//! [operator1]
//! [operator2]
  ['clamp', value, 0, 1]
//! [operator2]
//! [operator3]
  ['*', value, 18]
//! [operator3]
//! [operator4]
  ['+', value, 8]
//! [operator4]
 */
