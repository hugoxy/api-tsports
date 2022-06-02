import { Console } from 'console';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const credentials = require('../credentials/credentials.json');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const googleSheetId = '1029pwY3KDQ-NXZa-z1HcOB-p_noX7LYUfJ5afm448Wc';

async function acessarGoogleSheet(googleSheetId){
    
    try{
        //Iniciando a planilha --> Passando o ID do documento como parâmetro
        const documento = new GoogleSpreadsheet (googleSheetId);

        // Autenticação
        await documento.useServiceAccountAuth(credentials);

        // Carregando propriedades do documento
        await documento.loadInfo();     

        return documento;

    }catch(error){        
        console.log('Error', error)
    }

}

export async function buscandoDadosGoogleSheet(idPedido){

    try{

        //Instanciando objeto referente a planilha
        const documento = await acessarGoogleSheet(googleSheetId);

        //Selecionando a aba da planilha
        const sheet = documento.sheetsByIndex[0];

        //Buscando os dados da aba
        const registros = await sheet.getRows();

        //Carregando dados
        await sheet.loadCells('A1:I300'); 

        let dados = [];

        //Adicionando NumeroPedido e StatusPedido dentro de uma lista
        for(let r in registros){

            dados.push(
                {   
                    "NumeroPedido": registros[r]._rawData[7],
                    "StatusPedido": registros[r]._rawData[8]
                }
            )
        }

        console.log(dados);
        
        //Localizando o status do pedido de acordo com o código
        let pedido = dados.find(x => x.NumeroPedido == idPedido)

        if(pedido === undefined){
            return undefined
        }else{
            pedido = pedido.StatusPedido;      
        }         

        return pedido;       

    } catch(error){
        console.log('Error', error)
    }   

}