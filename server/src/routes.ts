import express from "express";
import { readAllUsers } from "./controllers/UserController";
// importando os controllers de calçados 
import {
	createCalcado,
	deleteCalcado,
	readAllCalcados,
	updateCalcado,
	readCalcadosById,
} from "./controllers/CalcadoController";


const routes = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
routes.get("/users", readAllUsers);

/**
 * @openapi
 * /calcados:
 *   post:
 *     summary: Cria um calcado
 *     tags: [Calcados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalcadoInput'
 *     responses:
 *       201:
 *         description: Calcado criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calcado'
 *       400:
 *         description: Erro de validacao
 */
routes.post("/calcados", createCalcado);

/**
 * @openapi
 * /calcados:
 *   get:
 *     summary: Lista todos os calcados
 *     tags: [Calcados]
 *     responses:
 *       200:
 *         description: Lista de calcados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Calcado'
 */
routes.get("/calcados", readAllCalcados);

/**
 * @openapi
 * /calcados/{id}:
 *   get:
 *     summary: Lista um calçado específico
 *     tags: [Calcados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do calçado
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Calçado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calcado'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Calçado não encontrado
 */
routes.get("/calcados/:id", readCalcadosById)

/**
 * @openapi
 * /calcados/{id}:
 *   patch:
 *     summary: Atualiza um calcado
 *     tags: [Calcados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalcadoUpdate'
 *     responses:
 *       200:
 *         description: Calcado atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calcado'
 *       404:
 *         description: Calcado nao encontrado
 */
routes.patch("/calcados/:id", updateCalcado);

/**
 * @openapi
 * /calcados/{id}:
 *   delete:
 *     summary: Remove um calcado
 *     tags: [Calcados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Calcado removido com sucesso
 *       404:
 *         description: Calcado nao encontrado
 */
routes.delete("/calcados/:id", deleteCalcado);


export default routes;
