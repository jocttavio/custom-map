import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import style from '../../styles/styleMap.module.css'
import Location from 'leaflet';
import MarkersHotel from './MarkersHotel';
import MarkersAtrac from './MarkersAtrac';
import MarkersRest from './MarkersRest';

export default function MiniMap({ locations, TypeMap, TypeIcon }) {
    const IconArray = ['/marcador_motora.png','/marcador_visual.png','/marcador_auditivo.png','/marcador_normal.png'];

    const customMarker = new Location.Icon({
        iconUrl: IconArray[TypeIcon],
        iconSize: [35, 35],
        iconAnchor: [15, 35],
        popupAnchor: [3, -32],
        shadowUrl: null,
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    return (
        <div className='w-[650px] h-[450px]'>
            <MapContainer className={style.generalmap} center={{ lat: '16.86', lng: '-99.87350399983222' }} zoom={1} scrollWheelZoom={false}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {
                    TypeMap === 1 ? (
                        <MarkersHotel locations={locations} MarkerIcon={customMarker} />
                    ): TypeMap == 2 ? (
                        <MarkersRest locations={locations} MarkerIcon={customMarker} />
                    ):(
                        <MarkersAtrac locations={locations} MarkerIcon={customMarker}/>
                    )
                }
            </MapContainer >
        </div>
    )
}
