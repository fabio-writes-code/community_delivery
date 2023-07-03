import {
  updateSelectedStore,
} from './stores.js';


// import data from './config.json' assert {type: 'json'}
mapboxgl.accessToken = document.getElementById('map-key').getAttribute('data-map')


// Create a new mapbox map instance
export function addMap() {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-113.4937, 53.5461],
    zoom: 10
  });

  map.addControl(new mapboxgl.NavigationControl());

  return map;
}

// Add a geoCoder control to a mapbox map
export function addGeocoder(map, geocoderCallback) {
  const geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl })
  map.addControl(geocoder)
  geocoder.on('result', data => { geocoderCallback(data) })
}

// Converts array of stores to GeoJSON format
export function convertToGeoJson(stores) {
  return {
    type: 'FeatureCollection',
    features: stores.map(store => (
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [store.longitude, store.latitude]
        },
        properties: {
          id: store.id,
          name: store.name,
          address: store.address,
          phone: store.phone,
          distance: store.distance,
          rating: store.rating
        }
      }
    ))
  }
}


// Display stores on map
export function plotStoresOnMap(map, storesGeoJson) {
  for (const store of storesGeoJson.features) {
    let el = document.createElement('div')
    el.className = 'store'
    el.title = `${store.properties.name}\n` +
      `approximately ${store.properties.distance.toFixed(2)} km away\n` +
      `Address: ${store.properties.address || 'N/A'}\n` +
      `Phone: ${store.properties.phone || 'N/A'}\n` +
      `Rating: ${store.properties.rating || 'N/A'}`;
    new mapboxgl.Marker(el)
      .setLngLat(store.geometry.coordinates)
      .addTo(map)
    el.addEventListener('click', function (e) {
      updateSelectedStore(store.properties.id)
    })
  }
}



// Zoom in-to a specific point on a map
export function flyToStore(map, point) {
  map.flyTo({
    center: point.geometry.coordinates,
    zoom: 20
  })

}


//Display store info on the map using a popup
export function displayStoreDetails(map, point) {
  const popUps = document.getElementsByClassName('mapboxgl-popup')

  if (popUps[0])
    popUps[0].remove()

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(point.geometry.coordinates)
    .setHTML(
      `
      <details>
        <summary>
          <h2>${point.properties.name}</h2>
        </summary>
        <dl>
          <dt>Distance</dt>
          <dd>Approximately <strong>${point.properties.distance.toFixed(2)} km</strong> away</dd>

          <dt>Address</dt>
          <dd>${point.properties.address || 'N/A'}</dd>

          <dt>Phone</dt>
          <dd>${point.properties.phone || 'N/A'}</dd>

          <dt>Rating</dt>
          <dd>${point.properties.rating || 'N/A'}</dd>
          
        </dl>
      </details>
      `
    )
    .addTo(map)
  return popup
}