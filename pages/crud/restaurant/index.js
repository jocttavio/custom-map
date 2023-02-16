import Image from "next/image";

import Link from "next/link";
import Index from "..";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const IndexR = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState([]);
  
  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://iexperience.devsmex.com/api/restaurant/" + id, {
        method: "DELETE",
      });
      setRestaurant(restaurant.filter(restaurant => restaurant.id_ubicacionrest !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async () => {
    const response = await fetch("http://iexperience.devsmex.com/api/restaurant");
    const {rows: restaurant} = await response.json();
    setRestaurant(restaurant);
  };

  useEffect(() => {
    loadHotel();
  }, []);

  return (
    <Index>
      <div className="grid p-40">
        <div className="flex justify-end ">
          <Link
            href={"/crud/restaurant/newRest"}
            className="text-lg font-semibold p-4 bg-green-400 rounded-xl"
          >
            New Restaurant
          </Link>
        </div>
        <div>
          {restaurant.map((restaurant) => (
            <div
              className="grid grid-cols-3 bg-black text-white h-20 mt-2 rounded-md"
              key={restaurant.id_ubicacionrest}
            >
              <div className="flex justify-start items-center">
                <Image src={"/"+restaurant.imagen_ubicacion} width={100} height={50} alt="img_restaurante"/>
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-center">
                  {restaurant.nombre_ubicacion}
                </h1>
              </div>
              <div className="flex items-center justify-center font-semibold">
                <button
                  className="bg-blue-500 p-4 rounded-lg "
                  onClick={() =>
                    router.push(`/crud/restaurant/edit/${restaurant.id_ubicacionrest}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-600  p-4 rounded-lg ml-4"
                  onClick={() => handleDelete(restaurant.id_ubicacionrest)}
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

export default IndexR;
