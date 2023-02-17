import React, { useState, useEffect } from "react";
import Index from "..";
import Link from "next/link";
import Map from '../../../components/MyMiniMap'

import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useRouter } from "next/router";

const NewUI = () => {

  const Options = ['Discapacidad motora', 'Discapacidad visual', 'Discapacidad auditiva', ''];

  const [hotel, setHotel] = useState({
    fk_discapacidad_h: 3,
    id_hotel: "",
    latitude_h: "",
    longitude_h: "",
    name_h: "",
    description_h: "",
    direction_h: "",
    pageweb_h: "",
    img_h: "",
  });
  const router = useRouter();

  const handlerChange = ({ target: { name, value } }) => {
    setHotel({ ...hotel, [name]: value });
  };

  const createHotel = async (hotel) => {
    await fetch("http://iexperience.devsmex.com/api/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });
  };

  const updateHotel = async (id, hotel) => {
    await fetch("http://iexperience.devsmex.com/api/hotels/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (router.query.id) {
        await updateHotel(router.query.id, hotel);
      } else {
        await createHotel(hotel);
        router.push("/crud/hotel");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async (id) => {
    const response = await fetch("http://iexperience.devsmex.com/api/hotels/" + id);
    const hotel = await response.json();
    setHotel({
      fk_discapacidad_h: hotel.fk_discapacidadhotel,
      id_hotel: hotel.id_ubicacionhotel,
      latitude_h: hotel.latitud_ubicacion,
      longitude_h: hotel.longitud_ubicacion,
      name_h: hotel.nombre_ubicacion,
      description_h: hotel.descripcion_ubicacion,
      direction_h: hotel.direccion_ubicacion,
      pageweb_h: hotel.paginaweb_ubicacion,
      img_h: hotel.imagen_ubicacion,
    });
  };

  useEffect(() => {
    if (router.query.id) loadHotel(router.query.id);
  }, [router.query]);

  // Inputs
  const textField = [
    {
      title: "Latitud de la Ubicacion",
      name: "latitude_h",
      label: "Latitud",
      value: hotel.latitude_h,
    },
    {
      title: "Longitud de la Ubicacion",
      name: "longitude_h",
      label: "Longitud",
      value: hotel.longitude_h,
    },
    {
      title: "Nombre del hotel",
      name: "name_h",
      label: "Nombre",
      value: hotel.name_h,
    },
    {
      title: "Descipcion del Hotel",
      name: "description_h",
      label: "Descripcion",
      value: hotel.description_h,
    },
    {
      title: "Direccion del Hotel",
      name: "direction_h",
      label: "Direccion",
      value: hotel.direction_h,
    },
    {
      title: "Pagina Web del Hotel",
      name: "pageweb_h",
      label: "Web",
      value: hotel.pageweb_h,
    },
    {
      title: "Imagen del Hotel",
      name: "img_h",
      label: "Image",
      value: hotel.img_h,
    },
  ];

  return (
    <Index>
      <div className="flex flex-col justify-center pt-32 px-20 items-center">
        <div className="flex justify-start w-full">
          <Link
            href={"/crud/hotel"}
            className="text-lg font-semibold p-4 bg-red-400 rounded-xl"
          >
            Cancel
          </Link>
        </div>
        <div className="flex gap-x-7 items-center justify-center">
          <div>

            <form className="form-info" onSubmit={handleSubmit}>
              <div className="w-96">
                {textField.map((field,index) => (
                  <div className="information-hotel" key={index}>
                    <p>{field.title}</p>
                    <TextField
                      onChange={handlerChange}
                      name={field.name}
                      label={field.label}
                      value={field.value}
                      multiline
                      fullWidth
                      rows={2}
                      id="outlined-multiline-static"
                      size="small"
                    />
                  </div>
                ))}
              </div>
              <div className='w-96'>
                <Autocomplete
                  options={Options}
                  value={hotel.fk_discapacidad_h === null ? Options[3] : Options[hotel.fk_discapacidad_h]}
                  onChange={(event, newValue) => { setHotel({ ...hotel, fk_discapacidad_h: Options.indexOf(newValue) }) }}
                  id="auto-complete"
                  autoComplete
                  autoSelect
                  includeInputInList
                  renderInput={(params) => (
                    <TextField {...params} label="Tipo de discapacidad" variant="standard" />
                  )}
                />
              </div>
              <div className=" flex justify-center items-center mt-4">
                <Button
                  className="bg-green-500"
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled={
                    !hotel.latitude_h ||
                    !hotel.longitude_h ||
                    !hotel.name_h ||
                    !hotel.description_h ||
                    !hotel.img_h
                  }
                >
                  {hotel.id_hotel ? "Actualizar" : "Agregar"}
                </Button>
              </div>
            </form>

          </div>

          <div>
            {router.query.id && (
              <Map locations={
                [{
                  latitude_h: hotel.latitude_h,
                  longitude_h: hotel.longitude_h,
                }]
              } TypeMap={1}
                TypeIcon={hotel.fk_discapacidad_h} />
            )}
          </div>

        </div>
        <style jsx>{`
          .information-hotel {
            width: 100%;
          }
        `}</style>
      </div>
    </Index>
  );
};

export default NewUI;
