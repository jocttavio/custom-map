import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import style from "../../styles/styleMap.module.css";
import Location from "leaflet";
import { useState, useEffect } from "react";
import { TextField, Autocomplete, IconButton, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Marker, Popup } from "react-leaflet";
import Image from "next/image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WebIcon from "@mui/icons-material/Web";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";

export default function GeneralMap({ TypeMap }) {
  const router = useRouter();
  const IconArray = [
    "/marcador_motora.png",
    "/marcador_auditivo.png",
  ];
  const DisabilityOptions = ["Discapacidad motora","Discapacidad auditiva"];
  const AttractionOptions = ["Naturales", "Artificiales"];

  const [Type_Map, setType_Map] = useState("");
  const [Options, setOptions] = useState([]);

  const [ArrayButton, setArrayButton] = useState(Array(3).fill(false));

  const [map, setMap] = useState(null);
  const [indexMark, setIndexMark] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [indexValue, setIndexValue] = useState(0);

  const [ShowInformation, setShowInformation] = useState(false);

  const [CardInfomation, setCardInformation] = useState([
    {
      nombre_ubicacion: "",
      descripcion_ubicacion: "",
      direccion_ubicacion: "",
      paginaweb_ubicacion: "",
      imagen_ubicacion: "",
      informacion:"",
    },
  ]);

  const [InfoMarkers, setInfoMarkers] = useState([
    {
      latitud_ubicacion: "",
      longitud_ubicacion: "",
      nombre_ubicacion: "",
      descripcion_ubicacion: "",
      direccion_ubicacion: "",
      paginaweb_ubicacion: "",
      imagen_ubicacion: "",
      informacion:""
    },
  ]);

  const customMarker = new Location.Icon({
    iconUrl: IconArray[indexMark],
    iconSize: [35, 35],
    iconAnchor: [15, 35],
    popupAnchor: [3, -32],
    shadowUrl: null,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const handleChange = (event, newValue) => {
    setIndexValue(DisabilityOptions.indexOf(newValue));
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
    setInfoMarkers([
      {
        latitud_ubicacion: "",
        longitud_ubicacion: "",
        nombre_ubicacion: "",
        descripcion_ubicacion: "",
        direccion_ubicacion: "",
        paginaweb_ubicacion: "",
        imagen_ubicacion: "",
        informacion:"",
      },
    ]);
    setType_Map("Hoteles");
    setOptions(DisabilityOptions);
  };

  const RestaurantMap = () => {
    map.setView([16.86, -99.87350399983222], 11);

    const newArray = [...ArrayButton];
    newArray[0] = false;
    newArray[1] = true;
    newArray[2] = false;
    setArrayButton(newArray);

    setSelectedValue(null);

    setInfoMarkers([
      {
        latitud_ubicacion: "",
        longitud_ubicacion: "",
        nombre_ubicacion: "",
        descripcion_ubicacion: "",
        direccion_ubicacion: "",
        paginaweb_ubicacion: "",
        imagen_ubicacion: "",
        informacion:"",
      },
    ]);
    setType_Map("Restaurantes");
    setOptions(DisabilityOptions);
  };

  const TouristMap = () => {
    map.setView([16.86, -99.87350399983222], 11);

    const newArray = [...ArrayButton];
    newArray[0] = false;
    newArray[1] = false;
    newArray[2] = true;
    setArrayButton(newArray);

    setSelectedValue(null);

    setInfoMarkers([
      {
        latitud_ubicacion: "",
        longitud_ubicacion: "",
        nombre_ubicacion: "",
        descripcion_ubicacion: "",
        direccion_ubicacion: "",
        paginaweb_ubicacion: "",
        imagen_ubicacion: "",
        informacion:"",
      },
    ]);

    setType_Map("Atracciones");
    setOptions(DisabilityOptions);
  };

  const loadHotel = async (fk) => {
    const response = await fetch("https://iexperience.devsmex.com/api/hotels", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fk_discapacidad_h: fk,
      }),
    });

    return await response.json();
  };

  const loadRestaurant = async (fk) => {
    const response = await fetch(
      "https://iexperience.devsmex.com/api/restaurant",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fk_discapacidad_r: fk,
        }),
      }
    );

    return await response.json();
  };

  const loadAtraction = async (fk) => {
    const response = await fetch(
      "https://iexperience.devsmex.com/api/atractions",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discapacidad_a: fk,
        }),
      }
    );

    return await response.json();
  };

  const ShowMarkers = async () => {
    map.setView([16.86, -99.87350399983222], 11);

    if (Type_Map === "Hoteles") {
      const { rows: hotels } = await loadHotel(indexValue);
      setInfoMarkers(hotels);
      setIndexMark(indexValue);
    } else if (Type_Map === "Restaurantes") {
      const { rows: restaurants } = await loadRestaurant(indexValue);
      setInfoMarkers(restaurants);
      setIndexMark(indexValue);
    } else {
      const { rows: atractions } = await loadAtraction(indexValue);
      setInfoMarkers(atractions);
      setIndexMark(indexValue);
    }
  };

  const CardInformation = (
    e,
    nombre,
    descripcion,
    direccion,
    paginaweb,
    imagen,
    informacion
  ) => {
    setCardInformation({
      nombre_ubicacion: nombre,
      descripcion_ubicacion: descripcion,
      direccion_ubicacion: direccion,
      paginaweb_ubicacion: paginaweb,
      imagen_ubicacion: imagen,
      informacion:informacion,
    });

    setShowInformation(true);
  };

  useEffect(() => {
    if (TypeMap === "Hoteles") {
      const newArray = [...ArrayButton];
      newArray[0] = true;
      newArray[1] = false;
      newArray[2] = false;
      setArrayButton(newArray);

      setOptions(DisabilityOptions);
      setType_Map(TypeMap);
    } else if (TypeMap === "Restaurantes") {
      const newArray = [...ArrayButton];
      newArray[0] = false;
      newArray[1] = true;
      newArray[2] = false;
      setArrayButton(newArray);

      setOptions(DisabilityOptions);
      setType_Map(TypeMap);
    } else if (TypeMap === "Atracciones") {
      const newArray = [...ArrayButton];
      newArray[0] = false;
      newArray[1] = false;
      newArray[2] = true;
      setArrayButton(newArray);

      setOptions(DisabilityOptions);
      setType_Map(TypeMap);
    } else {
      setOptions([""]);
      setType_Map("");
    }
  }, []);

  return (
    <div className="relative w-full h-[100vh]">
       <Head>
        <title>Iexperience</title>
        <meta name="description" content="Mapa para discapacitados en Acapulco" />
      </Head>
      <div className="absolute top-2 left-14 xl:right-96 lg:right-80 md:right-10 sm:right-4 right-2 flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col xl:justify-start justify-center items-center gap-x-2 gap-y-2 z-[1200]  bg-[#E4DCAB] rounded-lg p-3">
        <div className="flex flex-wrap flex-row justify-center items-center gap-y-1 gap-x-2">
          <div className="">
            <IconButton
              variant="contained"
              size="large"
              color="primary"
              onClick={() => router.push("/")}
            >
              <HomeIcon />
            </IconButton>
          </div>

          <div className="flex justify-center items-center">
            <Autocomplete
              options={Options}
              id="auto-complete"
              onChange={handleChange}
              sx={{ width: 240 }}
              autoComplete
              autoSelect
              size="small"
              value={selectedValue}
              includeInputInList
              name="ListOptions"
              renderInput={(params) => (
                <TextField {...params} label={Type_Map} />
              )}
            />
            <IconButton
              variant="contained"
              size="large"
              color="primary"
              disabled={!selectedValue}
              onClick={ShowMarkers}
            >
              <FilterAltIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-wrap flex-row justify-center items-center gap-y-3 gap-x-4">
          <Button
            variant="contained"
            size="small"
            disabled={ArrayButton[0]}
            onClick={HotelsMap}
            endIcon={<HotelIcon />}
          >
            Hoteles
          </Button>

          <Button
            variant="contained"
            size="small"
            disabled={ArrayButton[1]}
            onClick={RestaurantMap}
            endIcon={<RestaurantIcon />}
          >
            Restaurantes
          </Button>

          <Button
            variant="contained"
            size="small"
            disabled={ArrayButton[2]}
            onClick={TouristMap}
            endIcon={<BeachAccessIcon />}
          >
            Atractivos
          </Button>
        </div>
      </div>

      <MapContainer
        className={style.generalmap}
        center={{ lat: "16.86", lng: "-99.87350399983222" }}
        zoom={11}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {InfoMarkers.map((info, index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: info.latitud_ubicacion,
                lng: info.longitud_ubicacion,
              }}
              icon={customMarker}
              eventHandlers={{
                click: (e) => {
                  map.locate();
                  map.flyTo(
                    [
                      (e.latlng.lat + 0.001).toString(),
                      e.latlng.lng.toString(),
                    ],
                    18
                  );
                },
              }}
            >
              <Popup>
                <div className={style.ContainerMarker}>
                  <Image
                    src={"/" + info.imagen_ubicacion}
                    width={350}
                    height={250}
                    alt="img_atraccion"
                  />
                  <div className={style.NombreMarker}>
                    {info.nombre_ubicacion}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) =>
                        CardInformation(
                          e,
                          info.nombre_ubicacion,
                          info.descripcion_ubicacion,
                          info.direccion_ubicacion,
                          info.paginaweb_ubicacion,
                          info.imagen_ubicacion,
                          info.informacion,
                        )
                      }
                    >
                      Más información
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {ShowInformation && (
        <div className={style.ContentInformation}>
          <div className="relative xl:w-[790px] lg:w-[630px] md:w-[590px] sm:w-[560px] w-[470px] xl:h-[590px] lg:h-[590px] md:h-[620px] sm:h-[640px] h-[660px] bg-[#f7f1e3] rounded-2xl shadow-2xl overflow-auto">
            <div className="absolute top-0 right-0">
              <IconButton
                variant="contained"
                size="large"
                color="error"
                onClick={() => setShowInformation(false)}
              >
                <HighlightOffIcon />
              </IconButton>
            </div>

            <div className="flex justify-center items-center h-[55%]">
              <Image
                className="rounded-xl shadow-xl"
                src={"/" + CardInfomation.imagen_ubicacion}
                width={350}
                height={200}
                alt="img_atraccion"
              />
            </div>

            <div className="flex flex-col gap-y-2 h-[45%]">
              <div className={style.NombreMarker}>
                {CardInfomation.nombre_ubicacion}
              </div>

              <div className="flex flex-row justify-start items-center font-semibold mx-3">
                <IconButton variant="contained" size="large" color="inherit">
                  <WebIcon />
                </IconButton>
                <div className="truncate flex justify-center">
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<WebIcon />}
                  >
                    <a
                      href={CardInfomation.paginaweb_ubicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ir al Sitio Web
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex flex-row justify-start items-center font-semibold mx-3">
                <IconButton variant="contained" size="large" color="inherit">
                  <LocationOnIcon />
                </IconButton>
                <div>{CardInfomation.direccion_ubicacion}</div>
              </div>

              <ul className={style.ContentDescription}>
                <div className="text-justify">
                  <h3 className="text-xl text-center">Información general</h3>
                  <p>{CardInfomation.informacion}</p>
                </div>
                <div>
                  <IconButton variant="contained" size="large" color="inherit">
                    <DoneAllIcon />
                  </IconButton>
                  Accesibilidad
                </div>
                <div className="xl:ml-16 lg:ml-16 md:ml-10 sm:ml-9 ml-8 leading-7 mb-2">
                  {CardInfomation.descripcion_ubicacion
                    .split("\n")
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
