import React, { useState, useEffect } from "react";
import Index from "..";
import Link from "next/link";
import Map from "../../../components/MyMap";
// import style from "../../styles/crud.module.css";
import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";
const newUI = () => {
  const [hotel, setHotel] = useState({
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
    await fetch("http://localhost:3000/api/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });
  };

  const updateHotel = async (id, hotel) => {
    await fetch("http://localhost:3000/api/hotels/" + id, {
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
      }
      router.push("/crud/hotel");
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async (id) => {
    const response = await fetch("http://localhost:3000/api/hotels/" + id);
    const hotel = await response.json();
    setHotel({
      id_hotel: hotel.id_hotelubicacion,
      latitude_h: hotel.latitud_hotel,
      longitude_h: hotel.longitud_hotel,
      name_h: hotel.nombre_hotel,
      description_h: hotel.descripcion_hotel,
      direction_h: hotel.direccion_hotel,
      pageweb_h: hotel.paginaweb_hotel,
      img_h: hotel.imagen_hotel,
    });
  };
  useEffect(() => {
    if (router.query.id) loadHotel(router.query.id);
  }, [router.query]);

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
            Back
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <form className="form-info" onSubmit={handleSubmit}>
              <div className="w-96">
                {textField.map((field) => (
                  <div className="information-hotel">
                    <p>{field.title}</p>
                    <TextField
                      onChange={handlerChange}
                      name={field.name}
                      fullWidth
                      id="standard-basic"
                      label={field.label}
                      size="small"
                      variant="standard"
                      value={field.value}
                    />
                  </div>
                ))}
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
          <div className="w-96 h-32">
            <Map />
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

export default newUI;
