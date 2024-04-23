import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {icon} from 'https://cdn.esm.sh/leaflet';
import {useContext, useState, useEffect} from "react";
import {dataBaseAdsContext} from "../App";


const Location = ({formData, setFormData, ID, adLocation, mapEdit}) => {

    const {dataBaseAds} = useContext(dataBaseAdsContext)



    const customIcon = icon({
        iconUrl: 'https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png',
        iconSize: [60, 60],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
    const [position, setPosition] = useState(adLocation ? adLocation : [35.6892, 51.389]);

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                if (mapEdit) {
                    const {lat, lng} = e.latlng;
                    setPosition([lat, lng]);
                    map.flyTo([lat, lng], map.getZoom());
                    setFormData({...formData, location: [lat, lng]});
                }
            }
        });

        useEffect(() => {
            if (!mapEdit) {
                const ad = dataBaseAds.find(ad => ad.id === ID);
                setPosition(ad.location);
                map.flyTo(position, map.getZoom());

            }
        }, []);

        return position ? <Marker position={position} icon={customIcon}/> : null;
    }


    return (
        <MapContainer className="w-full overflow-hidden z-10" center={position} zoom={15}
                      style={{height: "300px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker/>
        </MapContainer>
    )
}

export default Location;