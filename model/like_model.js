const { pool } = require("../database/connection.js");
// Importamos el objeto pool de la conexión a la base de datos

// Definimos una función asíncrona llamada findAll que realiza una consulta para seleccionar todos los registros de la tabla "todos"
const findAllQuery = "SELECT * FROM posts";

const findAll = async () => {
  const { rows } = await pool.query(findAllQuery);
  return rows;
};

const create = async (titulo, url,descripcion) => {
  const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)";
  const values = [titulo, url, descripcion];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const remove = async (id) =>{
const query = "DELETE FROM posts WHERE id=$1";
const params = [id];
const {rowCount} = await pool.query(query, params);
return rowCount;
}

module.exports = { findAll, create,remove };
