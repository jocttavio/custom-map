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
      "SELECT * FROM Tabla_UbicacionesAtrac WHERE ID_UbicacionAtrac = $1";
    const value = [query.id];
    const result = await connection.query(text, value);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Atraccion no encontrado" });
    }
    // console.log(result);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOption = async (query, res) => {
  try {
    const text = "SELECT * FROM Tabla_UbicacionesAtrac WHERE FK_AtraccionAtrac = $1";
    const value = [query.fkoptions];
    const result = await connection.query(text, value);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Atraccion no encontrado" });
    }
    // console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAtrac = async (query, res, body) => {
  try {
    const {
      fk_atraccion_a,
      latitude_a,
      longitude_a,
      name_a,
      description_a,
      direction_a,
      pageweb_a,
      img_a,
    } = body;
    const text =
      "UPDATE Tabla_UbicacionesAtrac SET FK_AtraccionAtrac = $1, Latitud_Ubicacion  = $2, Longitud_Ubicacion = $3, Nombre_Ubicacion = $4, Descripcion_Ubicacion = $5, Direccion_Ubicacion = $6, PaginaWeb_Ubicacion = $7, Imagen_Ubicacion = $8  WHERE ID_UbicacionAtrac = $9 RETURNING *";

    const values = [
      fk_atraccion_a,
      latitude_a,
      longitude_a,
      name_a,
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
      "DELETE FROM Tabla_UbicacionesAtrac WHERE ID_UbicacionAtrac = $1 RETURNING *";
    const values = [query.id];
    const result = await connection.query(text, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Atraccion no encontrado!" });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
