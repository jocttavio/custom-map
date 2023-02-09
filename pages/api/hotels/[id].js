import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, query, body } = req;
  switch (method) {
    case "GET":
      return await getHotel(query, res);
    case "PUT":
      return await updateHotel(query, res, body);
    case "DELETE":
      return await deleteHotel(query, res);
    default:
      return res.status(400).json("method no allowed");
  }
}
const getHotel = async (query, res) => {
  try {
    const text =
      "SELECT * FROM Tabla_UbicacionesHotel WHERE ID_HotelUbicacion = $1";
    const value = [query.id];
    const result = await connection.query(text, value);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }
    // console.log(result);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const updateHotel = async (query, res, body) => {
  try {
    const {
      latitud_h,
      longitud_h,
      nombre_h,
      description_h,
      direction_h,
      pageweb_h,
      img_h,
    } = body;
    const text =
      "UPDATE Tabla_UbicacionesHotel SET Latitud_Hotel  = $1, Longitud_Hotel = $2, Nombre_Hotel = $3, Descripcion_Hotel = $4, Direccion_Hotel = $5, PaginaWeb_Hotel = $6, Imagen_Hotel = $7  WHERE ID_HotelUbicacion = $8 RETURNING *";
    const values = [
      latitud_h,
      longitud_h,
      nombre_h,
      description_h,
      direction_h,
      pageweb_h,
      img_h,
      query.id,
    ];
    const result = await connection.query(text, values);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Hotel no encontrado!" });
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteHotel = async (query, res) => {
  try {
    const text =
      "DELETE FROM Tabla_UbicacionesHotel WHERE ID_HotelUbicacion = $1 RETURNING *";
    const values = [query.id];
    const result = await connection.query(text, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Salon no encontrado!" });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
