import { buscandoDadosGoogleSheet } from '../sheets/index.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

class PedidosController{

    static buscarDados = async (req, res) => {

        const idPedido = req.params.id;

        try{

            let statusPedido = await buscandoDadosGoogleSheet(idPedido);            

            if(statusPedido === undefined)
            {
                res.status(404).send(`Pedido de código ${idPedido} não encontrado`); 
            }

            res.status(200).send(statusPedido);

        }catch(error){
            res.status(500).send("Error - ", error);
        }
    }

        


}

export default PedidosController;