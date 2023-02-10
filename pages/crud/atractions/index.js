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
      const res = await fetch("http://localhost:3000/api/atractions/" + id, {
        method: "DELETE",
      });
      setAtracc(atractions.filter(atraction => atraction.id_atracubicacion !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async () => {
    const response = await fetch("http://localhost:3000/api/atractions");
    const {rows: atraction} = await response.json();
    console.log(atraction);
    setAtracc(atraction);
  };
  useEffect(() => {
    loadHotel();
  }, []);

  return (
    <Index>
      <div className="grid p-40">
        <div className="flex justify-end ">
          <Link
            href={"/crud/atractions/newAtracc"}
            className="text-lg font-semibold p-4 bg-green-400 rounded-xl"
          >
            New Atraction
          </Link>
        </div>
        <div>
          {atractions.map((atraction) => (
            <div
              className="grid grid-cols-3 bg-black text-white h-20 mt-2 rounded-md"
              key={atraction.id_atracubicacion}
            >
              <div className="flex justify-start ">
                <Image src={"/logo.jpg"} width={150} height={20} />
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-center">
                  {atraction.nombre_atrac}
                </h1>
              </div>
              <div className="flex items-center justify-center font-semibold">
                <button
                  className="bg-blue-500 p-4 rounded-lg "
                  onClick={() =>
                    router.push(`/crud/atractions/edit/${atraction.id_atracubicacion}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-600  p-4 rounded-lg ml-4"
                  onClick={() => handleDelete(atraction.id_atracubicacion)}
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