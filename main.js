import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';


const map = new Map({
    target: 'map-container',
    layers: [
        new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: './data/countries.json',
            }),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const source = new VectorSource();

const layer = new VectorLayer({
    source: source,
});
map.addLayer(layer);

// map.addInteraction(new Link());

map.addInteraction(
    new DragAndDrop({
        source: source,
        formatConstructors: [GeoJSON],
    })
);


