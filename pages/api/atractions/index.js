import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      return await getAtraccs(req, res);
    case "POST":
      return await saveAtrac(body, res);
  }
}
const getAtraccs = async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM Tabla_UbicacionesAtrac"
    );
    // console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const saveAtrac = async (body, res) => {
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
    const query =
      "INSERT INTO  Tabla_UbicacionesAtrac(FK_AtraccionAtrac, Latitud_Ubicacion, Longitud_Ubicacion,Nombre_Ubicacion, Descripcion_Ubicacion, Direccion_Ubicacion, PaginaWeb_Ubicacion, Imagen_Ubicacion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

    const values = [
      fk_atraccion_a,
      latitude_a,
      longitude_a,
      name_a,
      description_a,
      direction_a,
      pageweb_a,
      img_a,
    ];

    const response = await connection.query(query, values);
    console.log(response);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};
