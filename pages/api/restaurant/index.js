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
      "SELECT * FROM Tabla_UbicacionesRest"
    );
    // console.log(result);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const saveHotel = async (body, res) => {
  try {
    const {
      latitud_r,
      longitud_r,
      nombre_r,
      description_r,
      direction_r,
      pageweb_r,
      img_r,
    } = body;
    const query =
      "INSERT INTO  Tabla_UbicacionesRest(Latitud_Rest, Longitud_Rest,Nombre_Rest, Descripcion_Rest, Direccion_Rest, PaginaWeb_Rest, Imagen_Rest ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const values = [
      latitud_r,
      longitud_r,
      nombre_r,
      description_r,
      direction_r,
      pageweb_r,
      img_r,
    ];

    const response = await connection.query(query, values);
    console.log(response);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
