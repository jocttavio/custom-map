import Image from "next/image";

import Link from "next/link";
import Index from "..";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const IndexA = () => {
  const router = useRouter();
  const [atractions, setAtracc] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://iexperience.devsmex.com/api/atractions/" + id, {
        method: "DELETE",
      });
      setAtracc(atractions.filter(atraction => atraction.id_ubicacionatrac !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadAtractions = async () => {
    const response = await fetch("http://iexperience.devsmex.com/api/atractions");
    const {rows: atraction} = await response.json();
    setAtracc(atraction);
  };
  
  useEffect(() => {
    loadAtractions();
  }, []);

  return (
    <Index>
      <div className="grid p-40">
        <div className="flex justify-end ">
          <Link
            href={"/crud/atractions/NewAtracc"}
            className="text-lg font-semibold p-4 bg-green-400 rounded-xl"
          >
            New Atraction
          </Link>
        </div>
        <div>
          {atractions.map((atraction) => (
            <div
              className="grid grid-cols-3 bg-black text-white h-20 mt-2 rounded-md"
              key={atraction.id_ubicacionatrac}
            >
              <div className="flex justify-start items-center">
                <Image src={"/"+atraction.imagen_ubicacion} width={100} height={50} alt="img_atraccion"/>
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-center">
                  {atraction.nombre_ubicacion}
                </h1>
              </div>
              <div className="flex items-center justify-center font-semibold">
                <button
                  className="bg-blue-500 p-4 rounded-lg "
                  onClick={() =>
                    router.push(`/crud/atractions/edit/${atraction.id_ubicacionatrac}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-600  p-4 rounded-lg ml-4"
                  onClick={() => handleDelete(atraction.id_ubicacionatrac)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Index>
  );
};

export default IndexA;