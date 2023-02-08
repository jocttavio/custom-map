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
    const result = await connection.query("SELECT * FROM Tabla_UbicacionesHotel");
    // console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    // return res.status()
    console.log(error);
  }
};

const saveHotel = async (body, res) => {
  try {
    const { name, description, policies, services, ubication, availability } =
      body;
    const query =
      "INSERT INTO room(room_name, description, policies, services, ubication, availability) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [
      name,
      description,
      policies,
      services,
      ubication,
      availability,
    ];

    const response = await connection.query(query, values);
    console.log(response);
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
