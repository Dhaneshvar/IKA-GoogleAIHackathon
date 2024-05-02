import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../assets/shop.png"),
  iconSize: [100, 100] // size of the icon
});

const ourCustomIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("../assets/storeBlue.png"),
  iconSize: [38, 38] // size of the icon
});
// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(100, 100, true)
  });
};

// markers
const markers = [
      {
        geocode: [11.9550, 79.8188],
        popUp: "Shop 2",
        Icon: customIcon,
      },
      {
        geocode: [11.9350, 79.8288],
        popUp: "Shop 3",
        Icon: customIcon,
        
      },
      {
        geocode: [11.9451621, 79.8254722],
        popUp: "Shop 1",
        Icon: customIcon,

      },
      {
        geocode: [11.950796, 79.8254722],
        popUp: "Your Shop",
        Icon: ourCustomIcon,
      }
    ];

export default function ShopLocation() {
  return (
    <MapContainer center={[11.9451621, 79.8254722]} zoom={15}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={marker.Icon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}