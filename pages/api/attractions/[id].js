import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, query, body } = req;
  switch (method) {
    case "GET":
      return await getAtrac(query, res);
    case "PUT":
      return await updateAtrac(query, res, body);
    case "DELETE":
      return await deleteAtrac(query, res);
    default:
      return res.status(400).json("method no allowed");
  }
}
const getAtrac = async (query, res) => {
  try {
    const text =
      "SELECT * FROM Tabla_UbicacionesAtrac WHERE ID_AtracUbicacion = $1";
    const value = [query.id];
    const result = await connection.query(text, value);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Atraccion no encontrado" });
    }
    // console.log(result);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const updateAtrac = async (query, res, body) => {
  try {
    const {
      latitud_a,
      longitud_a,
      nombre_a,
      description_a,
      direction_a,
      pageweb_a,
      img_a,
    } = body;
    const text =
      "UPDATE Tabla_UbicacionesAtrac SET Latitud_Atrac  = $1, Longitud_Atrac = $2, Nombre_Atrac = $3, Descripcion_Atrac = $4, Direccion_Atrac = $5, PaginaWeb_Atrac = $6, Imagen_Atrac = $7  WHERE ID_AtracUbicacion = $8 RETURNING *";

    const values = [
      latitud_a,
      longitud_a,
      nombre_a,
      description_a,
      direction_a,
      pageweb_a,
      img_a,
      query.id,
    ];
    const result = await connection.query(text, values);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Atraccion no encontrado!" });
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAtrac = async (query, res) => {
  try {
    const text =
      "DELETE FROM Tabla_UbicacionesAtrac WHERE ID_AtracUbicacion = $1 RETURNING *";
    const values = [query.id];
    const result = await connection.query(text, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Atraccion no encontrado!" });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
