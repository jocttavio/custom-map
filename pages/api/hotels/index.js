import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      return await getHotels(req, res);
    case "POST":
      return await saveHotel(body, res);
  }
}
const getHotels = async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM Tabla_UbicacionesHotel"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const saveHotel = async (body, res) => {
  try {
    const {
      latitude_h,
      longitude_h,
      name_h,
      description_h,
      direction_h,
      pageweb_h,
      img_h,
    } = body;
    const query =
      "INSERT INTO  Tabla_UbicacionesHotel(Latitud_Hotel, Longitud_Hotel,Nombre_Hotel, Descripcion_Hotel, Direccion_Hotel, PaginaWeb_Hotel, Imagen_Hotel ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const values = [
      latitude_h,
      longitude_h,
      name_h,
      description_h,
      direction_h,
      pageweb_h,
      img_h,
    ];

    const response = await connection.query(query, values);

    return res.status(200).json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
