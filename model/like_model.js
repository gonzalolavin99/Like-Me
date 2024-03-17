const { pool } = require("../database/connection.js");
// Importamos el objeto pool de la conexión a la base de datos

// Definimos una función asíncrona llamada findAll que realiza una consulta para seleccionar todos los registros de la tabla "todos"
const findAllQuery = "SELECT * FROM posts ORDER BY id";

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
};

const updatePost = async(id) =>{
  const query  = "UPDATE posts SET likes=likes+1 WHERE id=$1";
  const params = [id];
  const response = await pool.query(query,params);
  return response.rowCount;
}

module.exports = { findAll, create,remove, updatePost };
