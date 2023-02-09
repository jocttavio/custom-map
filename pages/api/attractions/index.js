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
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

const saveAtrac = async (body, res) => {
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
    const query =
      "INSERT INTO  Tabla_UbicacionesAtrac(Latitud_Atrac, Longitud_Atrac,Nombre_Atrac, Descripcion_Atrac, Direccion_Atrac, PaginaWeb_Atrac, Imagen_Atrac ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const values = [
      latitud_a,
      longitud_a,
      nombre_a,
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
