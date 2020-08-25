//uso dos módulos do node
const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");


//cria uma variável com express para utilizar as rotas get/post/put,etc...
let app = express();

//Para interpretar os parâmetros vindo do post
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

//inclui a pasta routes como pasta que contém todas as rotas do projeto
//inclui pas de utils tbm
consign().include("routes").include('utils').into(app);


// inicializa o servicor
app.listen(3000, "localhost", () => {
  console.log("servidor rodando!");
});
