import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';

const projection = new Projection({
    code: 'EPSG:32721',
    units: 'm',
});

// metadata from https://s3.us-west-2.amazonaws.com/sentinel-cogs/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/S2B_21HUB_20210915_0_L2A.json
const sourceExtent = [300000, 6090260, 409760, 6200020];

const source = new GeoTIFF({
    sources: [
        {
            // near-infrared reflectance
            url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B08.tif',
            max: 5000,
        },
        {
            // red reflectance
            url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B04.tif',
            max: 5000,
        },
        {
            // green reflectance
            url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/21/H/UB/2021/9/S2B_21HUB_20210915_0_L2A/B03.tif',
            max: 5000,
        },
    ],
});


const layer = new TileLayer({
    source: source,
});

new Map({
    target: 'map-container',
    layers: [layer],
    view: source.getView(),
});
