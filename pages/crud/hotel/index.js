import Image from "next/image";

import Link from "next/link";
import Index from "..";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const IndexH = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/api/hotels/" + id, {
        method: "DELETE",
      });
      setHotels(hotels.filter(hotel => hotel.id_ubicacionhotel !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadHotel = async () => {
    const response = await fetch("http://localhost:3000/api/hotels");
    const {rows: hotel} = await response.json();
    setHotels(hotel);
  };

  useEffect(() => {
    loadHotel();
  }, []);

  return (
    <Index>
      <div className="grid p-40">
        <div className="flex justify-end ">
          <Link
            href={"/crud/hotel/newUI"}
            className="text-lg font-semibold p-4 bg-green-400 rounded-xl"
          >
            New Hotel
          </Link>
        </div>
        <div>
          {hotels.map((hotel) => (
            <div
              className="grid grid-cols-3 bg-black text-white h-20 mt-2 rounded-md"
              key={hotel.id_ubicacionhotel}
            >
              <div className="flex justify-start items-center">
                <Image src={"/"+hotel.imagen_ubicacion} width={100} height={50} alt="img_hotel"/>
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-center">
                  {hotel.nombre_ubicacion}
                </h1>
              </div>
              <div className="flex items-center justify-center font-semibold">
                <button
                  className="bg-blue-500 p-4 rounded-lg "
                  onClick={() =>
                    router.push(`/crud/hotel/edit/${hotel.id_ubicacionhotel}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-600  p-4 rounded-lg ml-4"
                  onClick={() => handleDelete(hotel.id_ubicacionhotel)}
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

export default IndexH;

