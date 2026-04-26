import express from "express";
import {  readAllUsers } from "./controllers/UserController";
// importando os controllers de calçados 
import {
	createCalcado,
	deleteCalcado,
	readAllCalcados,
	updateCalcado,
} from "./controllers/CalcadoController";


const routes = express.Router();

routes.get("/users", readAllUsers);
 //criando rotas de calçados nos verbos HTTP
routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);


export default routes;
