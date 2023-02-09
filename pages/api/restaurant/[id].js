import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, query, body } = req;
  switch (method) {
    case "GET":
      return await getRestaurant(query, res);
    case "PUT":
      return await updateRestaurant(query, res, body);
    case "DELETE":
      return await deleteRestaurant(query, res);
    default:
      return res.status(400).json("method no allowed");
  }
}
const getRestaurant = async (query, res) => {
  try {
    const text =
      "SELECT * FROM Tabla_UbicacionesRest WHERE ID_RestUbicacion = $1";
    const value = [query.id];
    const result = await connection.query(text, value);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }
    // console.log(result);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const updateRestaurant = async (query, res, body) => {
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
    const text =
      "UPDATE Tabla_UbicacionesRest SET Latitud_Rest  = $1, Longitud_Rest = $2, Nombre_Rest = $3, Descripcion_Rest = $4, Direccion_Rest = $5, PaginaWeb_Rest = $6, Imagen_Rest = $7  WHERE ID_RestUbicacion = $8 RETURNING *";

    const values = [
      latitud_r,
      longitud_r,
      nombre_r,
      description_r,
      direction_r,
      pageweb_r,
      img_r,
      query.id,
    ];
    const result = await connection.query(text, values);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Restaurante no encontrado!" });
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRestaurant = async (query, res) => {
  try {
    const text =
      "DELETE FROM Tabla_UbicacionesRest WHERE ID_RestUbicacion = $1 RETURNING *";
    const values = [query.id];
    const result = await connection.query(text, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Restaurante no encontrado!" });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
