const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { pool } = require("./database/connection.js");
const { findAll, create, remove } = require("./model/like_model.js");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Establece la aplicación para escuchar en el puerto 5000
  console.log(`Server listening on port http://localhost:${PORT}`);
});

//GET de likeme
app.get("/posts", async (req, res) => {
  try {
    const posts = await findAll();
    return res.json(posts);
  } catch (error) {
    console.log("Error al obtener los posts", error);
    return res.status(500).json({ message: "Error al obtener los elementos" });
  }
});

//POST de like
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
   
    const posts = await create(titulo,
      url,
      descripcion);
    res.status(200).json({ message: "Post  ingresado con  éxito" });
  } catch (error) {
    console.log("Error al crear un post", error);
    return res.status(500).json({ message: "Error al crear el post" });
  }
});

// app.delete('/posts/:id', async (req, res) =>{
//   const id=req.params.id;
//   try{
//     const posts = await remove(id);
//     if(!posts){
//       return res.status(404).json({message:"No se encontró el post"});
      
//     }
//     return res.json({message:"Post eliminado con éxito"});
//   }catch(error){
//     console.log(error);
//     return res.status(500).json({message:'Server Error'});
//   }
// })
