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

const NewRest = () => {
  const Options = ['Discapacidad motora', 'Discapacidad visual', 'Discapacidad auditiva',''];

  const [restaurant, setRestaurant] = useState({
    fk_discapacidad_r: 3,
    id_restaurant: "",
    latitude_r: "",
    longitude_r: "",
    name_r: "",
    description_r: "",
    direction_r: "",
    pageweb_r: "",
    img_r: "",
  });
  const router = useRouter();

  const handlerChange = ({ target: { name, value } }) => {
    setRestaurant({ ...restaurant, [name]: value });
  };

  const createRest = async (restaurant) => {
    await fetch("http://iexperience.devsmex.com/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });
  };

  const updateRest = async (id, restaurant) => {
    await fetch("http://iexperience.devsmex.com/api/restaurant/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (router.query.id) {
        await updateRest(router.query.id, restaurant);
      } else {
        await createRest(restaurant);
}
        router.push("/crud/restaurant");
    } catch (error) {
      console.log(error);
    }
  };

  const loadRest = async (id) => {
    const response = await fetch("http://iexperience.devsmex.com/api/restaurant/" + id);
    const restaurant = await response.json( );
    setRestaurant({
      fk_discapacidad_r: restaurant.fk_discapacidadrest,
      id_restaurant: restaurant.id_ubicacionrest,
      latitude_r: restaurant.latitud_ubicacion,
      longitude_r: restaurant.longitud_ubicacion,
      name_r: restaurant.nombre_ubicacion,
      description_r: restaurant.descripcion_ubicacion,
      direction_r: restaurant.direccion_ubicacion,
      pageweb_r: restaurant.paginaweb_ubicacion,
      img_r: restaurant.imagen_ubicacion,
    });
  };
  
  useEffect(() => {
    if (router.query.id) loadRest(router.query.id);
  }, [router.query]);

  const textField = [
    {
      title: "Latitud de la Ubicacion",
      name: "latitude_r",
      label: "Latitud",
      value: restaurant.latitude_r,
    },
    {
      title: "Longitud de la Ubicacion",
      name: "longitude_r",
      label: "Longitud",
      value: restaurant.longitude_r,
    },
    {
      title: "Nombre del Restaurante",
      name: "name_r",
      label: "Nombre",
      value: restaurant.name_r,
    },
    {
      title: "Descipcion del Restaurant",
      name: "description_r",
      label: "Descripcion",
      value: restaurant.description_r,
    },
    {
      title: "Direccion del Restaurant",
      name: "direction_r",
      label: "Direccion",
      value: restaurant.direction_r,
    },
    {
      title: "Pagina Web del Restaurant",
      name: "pageweb_r",
      label: "Web",
      value: restaurant.pageweb_r,
    },
    {
      title: "Imagen del Restaurant",
      name: "img_r",
      label: "Image",
      value: restaurant.img_r,
    },
  ];

  return (
    <Index>
      <div className="flex flex-col justify-center pt-32 px-20 items-center">
        <div className="flex justify-start w-full">
          <Link
            href={"/crud/restaurant"}
            className="text-lg font-semibold p-4 bg-red-400 rounded-xl"
          >
         Cancel
          </Link>
        </div>
        <div className="flex gap-x-7 items-center justify-center">
          <div>
            <form className="form-info" onSubmit={handleSubmit}>
              <div className="w-96">
                {textField.map((field, index) => (
                  <div className="information-restaurant" key={index}>
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
                  value={restaurant.fk_discapacidad_r === null ? Options[3] : Options[restaurant.fk_discapacidad_r]}
                  onChange={(event, newValue) => { setRestaurant({ ...restaurant, fk_discapacidad_r: Options.indexOf(newValue) }) }}
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
                    !restaurant.latitude_r ||
                    !restaurant.longitude_r ||
                    !restaurant.name_r ||
                    !restaurant.description_r ||
                    !restaurant.img_r
                  }
                >
                  {restaurant.id_restaurant ? "Actualizar" : "Agregar"}
                </Button>
              </div>
            </form>
          </div>
          <div>
            {router.query.id && (
              <Map locations={
                [{
                  latitude_r: restaurant.latitude_r,
                  longitude_r: restaurant.longitude_r,
                }]
              } TypeMap={2}
                TypeIcon={restaurant.fk_discapacidad_r} />
            )}
          </div>

        </div>
        <style jsx>{`
          .information-restaurant {
            width: 100%;
          }
        `}</style>
      </div>
    </Index>
  )
};

export default NewRest;
