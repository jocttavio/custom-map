import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import style from '../../styles/styleMap.module.css'
import MyMarkers from './MyMarkers';
import Location from 'leaflet';
import { useState, useEffect } from 'react'
import { TextField, Autocomplete, IconButton, Button } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function GeneralMap({ TypeMap }) {
    const IconArray = ['/ubication.png', '/ubication2.png'];
    const DisabilityOptions = ['Discapacidad motora', 'Discapacidad visual', 'Discapacidad auditiva'];
    const AttractionOptions = ['Naturales', 'Artificiales'];

    const [Type_Map, setType_Map] = useState('');
    const [Options, setOptions] = useState([]);

    const [ArrayButton, setArrayButton] = useState(Array(3).fill(false));

    const [map, setMap] = useState(null)
    const [indexMark, setIndexMark] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [indexValue, setIndexValue] = useState(0);

    const [InfoMarkers, setInfoMarkers] = useState([{
        latitud_ubicacion: "",
        longitud_ubicacion: "",
        nombre_ubicacion: "",
        descripcion_ubicacion: "",
        direccion_ubicacion: "",
        paginaWeb_ubicacion: "",
        imagen_ubicacion: ""
    }]);

    const customMarker = new Location.Icon({
        iconUrl: IconArray[indexMark],
        iconSize: [35, 35],
        iconAnchor: [15, 35],
        popupAnchor: [3, -32],
        shadowUrl: null,
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    const handleChange = (event, newValue) => {
        if (Type_Map === "Atracciones") {
            setIndexValue(AttractionOptions.indexOf(newValue));
        } else {
            setIndexValue(DisabilityOptions.indexOf(newValue));
        }
        setSelectedValue(newValue);
    };


    const HotelsMap = () => {
        map.setView([16.86, -99.87350399983222], 11);

        const newArray = [...ArrayButton];
        newArray[0] = true;
        newArray[1] = false;
        newArray[2] = false;
        setArrayButton(newArray);

        setSelectedValue(null);
        setInfoMarkers([{
            latitud_ubicacion: "",
            longitud_ubicacion: "",
            nombre_ubicacion: "",
            descripcion_ubicacion: "",
            direccion_ubicacion: "",
            paginaWeb_ubicacion: "",
            imagen_ubicacion: ""
        }]);
        setType_Map('Hoteles');
        setOptions(DisabilityOptions);
    };

    const RestaurantMap = () => {
        map.setView([16.86, -99.87350399983222], 11)

        const newArray = [...ArrayButton];
        newArray[0] = false;
        newArray[1] = true;
        newArray[2] = false;
        setArrayButton(newArray);

        setSelectedValue(null);

        setInfoMarkers([{
            latitud_ubicacion: "",
            longitud_ubicacion: "",
            nombre_ubicacion: "",
            descripcion_ubicacion: "",
            direccion_ubicacion: "",
            paginaWeb_ubicacion: "",
            imagen_ubicacion: ""
        }]);
        setType_Map('Restaurantes');
        setOptions(DisabilityOptions);
    };

    const TouristMap = () => {
        map.setView([16.86, -99.87350399983222], 11)

        const newArray = [...ArrayButton];
        newArray[0] = false;
        newArray[1] = false;
        newArray[2] = true;
        setArrayButton(newArray);

        setSelectedValue(null);

        setInfoMarkers([{
            latitud_ubicacion: "",
            longitud_ubicacion: "",
            nombre_ubicacion: "",
            descripcion_ubicacion: "",
            direccion_ubicacion: "",
            paginaWeb_ubicacion: "",
            imagen_ubicacion: ""
        }]);
        setType_Map('Atracciones');
        setOptions(AttractionOptions);
    };


    const ShowMarkers = async () => {
        map.setView([16.86, -99.87350399983222], 11)

        if (Type_Map === 'Hoteles') {

            const response = await fetch("http://localhost:3000/api/hotels" + indexValue);
            const { rows: hotels } = await response.json();
            setInfoMarkers(hotels);

            setIndexMark(0);

        } else if (Type_Map === 'Restaurantes') {

            const response = await fetch("http://localhost:3000/api/restaurant");
            const { rows: restaurants } = await response.json();
            setInfoMarkers(restaurants);

            setIndexMark(1);

        } else {

            const response = await fetch("http://localhost:3000/api/atractions");
            const { rows: atractions } = await response.json();
            setInfoMarkers(atractions);

            setIndexMark(1);

        }
    };

    useEffect(() => {
        if (TypeMap === 'Hoteles') {

            const newArray = [...ArrayButton];
            newArray[0] = true;
            newArray[1] = false;
            newArray[2] = false;
            setArrayButton(newArray);

            setOptions(DisabilityOptions);
            setType_Map(TypeMap);

        } else if (TypeMap === 'Restaurantes') {

            const newArray = [...ArrayButton];
            newArray[0] = false;
            newArray[1] = true;
            newArray[2] = false;
            setArrayButton(newArray);

            setOptions(DisabilityOptions);
            setType_Map(TypeMap);

        } else if (TypeMap === 'Atracciones') {

            const newArray = [...ArrayButton];
            newArray[0] = false;
            newArray[1] = false;
            newArray[2] = true;
            setArrayButton(newArray);

            setOptions(AttractionOptions);
            setType_Map(TypeMap);

        } else {

            setOptions(['']);
            setType_Map('');

        }
    }, [])

    return (
        <div className='relative w-full h-[100vh]'>
            <div className='absolute top-2 left-14 flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col xl:justify-start justify-center items-center gap-x-4 gap-y-2 z-[1200]  bg-[#E4DCAB] rounded-lg p-3'>
                <div className='flex justify-center items-center'>
                    <div className='xl:w-[240px] lg:w-[240px] md:w-[240px] sm:w-[220px] w-[220px]'>
                        <Autocomplete
                            options={Options}
                            id="auto-complete"
                            onChange={handleChange}
                            autoComplete
                            autoSelect
                            size='small'
                            value={selectedValue}
                            includeInputInList
                            name='ListOptions'
                            renderInput={(params) => <TextField {...params} label={Type_Map} />}
                        />
                    </div>
                    <div>
                        <IconButton variant="contained" size='large' color='primary' disabled={!selectedValue} onClick={ShowMarkers}>
                            <FilterAltIcon />
                        </IconButton>
                    </div>
                </div>

                <div className='flex flex-wrap flex-row justify-center items-center gap-y-3 gap-x-4 xl:w-[470px] lg:w-[450px] md:w-[370px] sm:w-[240px] w-[270px]'>
                    <Button variant="contained" size='small' disabled={ArrayButton[0]} onClick={HotelsMap} endIcon={<HotelIcon />}>
                        Hoteles
                    </Button>

                    <Button variant="contained" size='small' disabled={ArrayButton[1]} onClick={RestaurantMap} endIcon={<RestaurantIcon />}>
                        Restaurantes
                    </Button>

                    <Button variant="contained" size='small' disabled={ArrayButton[2]} onClick={TouristMap} endIcon={<BeachAccessIcon />}>
                        Atracctivos
                    </Button>
                </div>

            </div>


            <MapContainer className={style.generalmap} center={{ lat: '16.86', lng: '-99.87350399983222' }} zoom={11} scrollWheelZoom={false} ref={setMap}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <MyMarkers locations={InfoMarkers} MarkerIcon={customMarker} />
            </MapContainer >
        </div>
    )
}
