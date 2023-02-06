import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import style from '../../styles/Mymap.module.css'

export default function MyMap() {
    return (
        <MapContainer className={style.map} center={{ lat: '16.84477839135118', lng: '-99.87350399983222' }} zoom={11} scrollWheelZoom={false}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        </MapContainer >
    )
}

