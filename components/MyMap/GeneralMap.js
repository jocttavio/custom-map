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

    const locations1 = [{
        "latitud": "16.862381833316288",
        "longitud": "-99.87465523440797",
    },
    {
        "latitud": "16.854731768200875",
        "longitud": "-99.85898164928108",
    },
    {
        "latitud": "16.861288147819533",
        "longitud": "-99.8777030178885",
    },
    {
        "latitud": "16.84947838180016",
        "longitud": "-99.84913399968941",
    },
    {
        "latitud": "16.845631386100543",
        "longitud": "-99.84937653258652",
    }];

    const locations2 = [{
        "latitud": "16.860484691337643",
        "longitud": "-99.88198106729698",
    },
    {
        "latitud": "16.84987680585275",
        "longitud": "-99.85335240159746",
    },
    {
        "latitud": "16.85540299504331",
        "longitud": "-99.86109090611768",
    },
    {
        "latitud": "16.843554909691797",
        "longitud": "-99.84708990504417",
    },
    {
        "latitud": "16.859787161440458",
        "longitud": "-99.86633038513821",
    }];

    const IconArray = ['./ubication.png', './ubication2.png'];
    const DisabilityOptions = ['Discapacidad motora', 'Discapacidad visual', 'Discapacidad auditiva'];
    const AttractionOptions = ['Naturales', 'Artificiales'];

    const [Type_Map, setType_Map] = useState('');
    const [Options, setOptions] = useState([]);
    
    const [ArrayButton, setArrayButton] = useState(Array(3).fill(false));

    const [map, setMap] = useState(null)
    const [indexMark, setIndexMark] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [InfoMarkers, setInfoMarkers] = useState([{
        "latitud": "",
        "longitud": "",
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
            "latitud": "",
            "longitud": "",
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
            "latitud": "",
            "longitud": "",
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
            "latitud": "",
            "longitud": "",
        }]);
        setType_Map('Atracciones');
        setOptions(AttractionOptions);
    };


    const ShowMarkers = () => {
        map.setView([16.86, -99.87350399983222], 11)

        if (Type_Map === 'Hoteles') {

            if (selectedValue === 'Discapacidad motora') {
                setInfoMarkers(locations1);
                setIndexMark(0);
            } else if (selectedValue === 'Discapacidad visual') {
                setInfoMarkers(locations2);
                setIndexMark(1);
            } else {
                setInfoMarkers([{
                    "latitud": "",
                    "longitud": "",
                }]);
            }

        } else if (Type_Map === 'Restaurantes') {

            if (selectedValue === 'Discapacidad motora') {

            } else if (selectedValue === 'Discapacidad visual') {

            } else {

            }

        } else {

            if (selectedValue === 'Naturales') {

            } else {

            }

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
            <div className='absolute top-2 left-14 flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col xl:justify-start justify-center items-center gap-x-4 gap-y-2 z-[1200] xl:w-[750px] lg:w-[725] md:w-[710px] sm:w-[580px] w-[300px] xl:h-20 lg:h-24 md:h-28 sm:h-32 h-40 bg-[#E4DCAB] rounded-lg'>
                <div className='flex justify-center items-center'>
                    <div className='ml-4 w-[240px]'>
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
                        <IconButton variant="contained" size='large' color='primary' disabled = {!selectedValue} onClick={ShowMarkers}>
                            <FilterAltIcon />
                        </IconButton>
                    </div>
                </div>

                <div className='flex flex-wrap flex-row justify-center items-center gap-y-3 gap-x-4'>
                    <Button variant="contained"  size='small' disabled={ArrayButton[0]} onClick={HotelsMap} endIcon={<HotelIcon />}>
                        Hoteles
                    </Button>

                    <Button variant="contained"  size='small' disabled={ArrayButton[1]} onClick={RestaurantMap} endIcon={<RestaurantIcon />}>
                        Restaurantes
                    </Button>

                    <Button variant="contained"  size='small' disabled={ArrayButton[2]} onClick={TouristMap} endIcon={<BeachAccessIcon />}>
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
