import { Router } from 'express';
import knex from '../database/connection';

const abastecimentoRouter = Router();

abastecimentoRouter.get('/', async (request, response)=>{
    const nome = request.query.nome;
    
    if(nome){
        const verificaCombustivel = await knex('combustivel').where({nome:nome}).first();

        if(!verificaCombustivel){
            
            return response.status(400).json({ message: `Combustivel não cadastrado ` });
        }
    const abastecimento = await knex('abastecimento')
    .innerJoin('combustivel','abastecimento.combustivel_id','combustivel.id')
    .where({'combustivel.nome':nome});
    

    response.json(abastecimento);
    }
    
    else{
        const abastecimento = await knex('abastecimento').select('*');
        response.json(abastecimento);
    }
    
});

abastecimentoRouter.post('/', async (request, response)=>{

    const {litro,valor,data,combustivel_id,postos_id} = request.body;
    const abastecimento = {
        litro,
        valor,
        data,
        combustivel_id,
        postos_id
    };

    const verificaCombusdtivel = await knex('combustivel').where('id',combustivel_id).first();

        if(!verificaCombusdtivel){
            
            return response.status(400).json({ message: `Combustivel não cadastrado id: [${combustivel_id}]` });
        } 

    const verificaPosto = await knex('postos').where('id',postos_id).first();

        if(!verificaPosto){
            
            return response.status(400).json({ message: `Posto não cadastrado id: [${postos_id}]` });
        } 
    
   const newIds= await knex('abastecimento').insert(abastecimento);
   const local_id = newIds[0];
    response.json({local_id,message:"Requisição POST"});

});

export default abastecimentoRouter;