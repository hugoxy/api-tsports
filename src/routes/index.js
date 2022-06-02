import express from "express";
import pedidos from "./pedidosRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "API - T-Sports1"})
    })

    app.use(
        express.json(),
        pedidos,
    )
}

export default routes;