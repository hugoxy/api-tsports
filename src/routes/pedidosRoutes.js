import express from "express";
import PedidosController from "../controllers/PedidosController.js";

const router = express.Router();

router
    .get("/statusPedido/:id", PedidosController.buscarDados)    


export default router;