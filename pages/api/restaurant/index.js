import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      return await getRestaurant(req, res);
    case "POST":
      return await saveRestaurant(body, res);
      case "PUT":
        return await getRestaurantFk(body,res)
  }
}
const getRestaurant = async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM Tabla_UbicacionesRest"
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getRestaurantFk = async (body, res) => {
  try {
    const { fk_discapacidad_r } = body;
    const query =
      "SELECT * FROM Tabla_UbicacionesRest WHERE FK_DiscapacidadRest = $1";

      const value =[fk_discapacidad_r]
    const result = await connection.query(query, value);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const saveRestaurant = async (body, res) => {
  try {
    const {
      fk_discapacidad_r,
      latitude_r,
      longitude_r,
      name_r,
      description_r,
      direction_r,
      pageweb_r,
      img_r,
    } = body;
    const query =
      "INSERT INTO  Tabla_UbicacionesRest(FK_DiscapacidadRest, Latitud_Ubicacion, Longitud_Ubicacion,Nombre_Ubicacion, Descripcion_Ubicacion, Direccion_Ubicacion, PaginaWeb_Ubicacion, Imagen_Ubicacion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

    const values = [
      fk_discapacidad_r,
      latitude_r,
      longitude_r,
      name_r,
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
