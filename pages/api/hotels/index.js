import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      return await getHotels(req, res);
    case "POST":
      return await saveHotel(body, res);
    case "PUT":
      return await getHotelsFk(body, res);
  }
}
const getHotels = async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM Tabla_UbicacionesHotel"
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getHotelsFk = async (body, res) => {
  try {
    const { fk_discapacidad_h } = body;
    const query =
      "SELECT * FROM Tabla_UbicacionesHotel WHERE FK_DiscapacidadHotel = $1";

      const value =[fk_discapacidad_h]
    const result = await connection.query(query, value);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const saveHotel = async (body, res) => {
  try {
    const {
      fk_discapacidad_h,
      latitude_h,
      longitude_h,
      name_h,
      description_h,
      direction_h,
      pageweb_h,
      img_h,
    } = body;
    const query =
      "INSERT INTO  Tabla_UbicacionesHotel(FK_DiscapacidadHotel, Latitud_Ubicacion, Longitud_Ubicacion,Nombre_Ubicacion, Descripcion_Ubicacion, Direccion_Ubicacion, PaginaWeb_Ubicacion, Imagen_Ubicacion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

    const values = [
      fk_discapacidad_h,
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
