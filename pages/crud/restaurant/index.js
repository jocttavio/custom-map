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
      const res = await fetch("http://localhost:3000/api/restaurant/" + id, {
        method: "DELETE",
      });
      setRestaurant(restaurant.filter(restaurant => restaurant.id_restubicacion !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async () => {
    const response = await fetch("http://localhost:3000/api/restaurant");
    const {rows: restaurant} = await response.json();
    console.log(restaurant);
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
              key={restaurant.id_restubicacion}
            >
              <div className="flex justify-start ">
                <Image src={"/logo.jpg"} width={150} height={20} />
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-center">
                  {restaurant.nombre_rest}
                </h1>
              </div>
              <div className="flex items-center justify-center font-semibold">
                <button
                  className="bg-blue-500 p-4 rounded-lg "
                  onClick={() =>
                    router.push(`/crud/restaurant/edit/${restaurant.id_restubicacion}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-600  p-4 rounded-lg ml-4"
                  onClick={() => handleDelete(restaurant.id_restubicacion)}
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
