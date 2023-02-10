import React, { useState, useEffect } from "react";
import Index from "..";
import Link from "next/link";
import Map from "../../../components/MyMap";

import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";

const newUI = () => {
  const [atraction, setAtracc] = useState({
    id_atrac: "",
    latitude_a: "",
    longitude_a: "",
    name_a: "",
    description_a: "",
    direction_a: "",
    pageweb_a: "",
    img_a: "",
  });
  const router = useRouter();

  const handlerChange = ({ target: { name, value } }) => {
    setAtracc({ ...atraction, [name]: value });
  };

  const createHotel = async (atraction) => {
    await fetch("http://localhost:3000/api/atractions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atraction),
    });
  };

  const updateHotel = async (id, atraction) => {
    await fetch("http://localhost:3000/api/atractions/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atraction),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (router.query.id) {
        await updateHotel(router.query.id, atraction);
      } else {
        await createHotel(atraction);
      }
      router.push("/crud/atractions");
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async (id) => {
    const response = await fetch("http://localhost:3000/api/atractions/" + id);
    const atraction = await response.json();
    setAtracc({
      id_atrac: atraction.id_atracubicacion,
      latitude_a: atraction.latitud_atrac,
      longitude_a: atraction.longitud_atrac,
      name_a: atraction.nombre_atrac,
      description_a: atraction.descripcion_atrac,
      direction_a: atraction.direccion_atrac,
      pageweb_a: atraction.paginaweb_atrac,
      img_a: atraction.imagen_atrac,
    });
  };
  useEffect(() => {
    if (router.query.id) loadHotel(router.query.id);
  }, [router.query]);

  const textField = [
    {
      title: "Latitud de la Ubicacion",
      name: "latitude_a",
      label: "Latitud",
      value: atraction.latitude_a,
    },
    {
      title: "Longitud de la Ubicacion",
      name: "longitude_a",
      label: "Longitud",
      value: atraction.longitude_a,
    },
    {
      title: "Nombre de la Atracción",
      name: "name_a",
      label: "Nombre",
      value: atraction.name_a,
    },
    {
      title: "Descipcion del Atraccion",
      name: "description_a",
      label: "Descripcion",
      value: atraction.description_a,
    },
    {
      title: "Direccion del Atraccion",
      name: "direction_a",
      label: "Direccion",
      value: atraction.direction_a,
    },
    {
      title: "Pagina Web del Atraccion",
      name: "pageweb_a",
      label: "Web",
      value: atraction.pageweb_a,
    },
    {
      title: "Imagen del Atraccion",
      name: "img_a",
      label: "Image",
      value: atraction.img_a,
    },
  ];

  return (
    <Index>
      <div className="flex flex-col justify-center pt-32 px-20 items-center">
        <div className="flex justify-start w-full">
          <Link
            href={"/crud/atractions"}
            className="text-lg font-semibold p-4 bg-red-400 rounded-xl"
          >
            Cancel
          </Link>
        </div>
        <div className="grid">
          <div>
            <form className="form-info" onSubmit={handleSubmit}>
              <div className="w-96">
                {textField.map((field) => (
                  <div className="information-atraction">
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
                    !atraction.latitude_a ||
                    !atraction.longitude_a ||
                    !atraction.name_a ||
                    !atraction.description_a ||
                    !atraction.img_a
                  }
                >
                  {atraction.id_atrac ? "Actualizar" : "Agregar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <style jsx>{`
          .information-atraction {
            width: 100%;
          }
        `}</style>
      </div>
    </Index>
  );
};

export default newUI;
