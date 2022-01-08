import { Router } from 'express';
import knex from '../database/connection';

const combustivelRouter = Router();

combustivelRouter.get('/', async (request, response)=>{

    const nome = request.query.nome;
    if(nome){
        const verificaCombustivel = await knex('combustivel').where({nome:nome}).first();

        if(!verificaCombustivel){
            
            return response.status(400).json({ message: `Combustivel não cadastrado ` });
        }
    const combustivel = await knex('combustivel').where({nome:nome}).select('*');
    
    response.json(combustivel);
    }
    else{
    const combustivel = await knex('combustivel').select('*');
    response.json(combustivel);
    }

});

combustivelRouter.post('/', async (request, response)=>{

    const {nome,dat_cadastro} = request.body;
    const combustivel = {
        nome,
        dat_cadastro,
    };
   const newIds= await knex('combustivel').insert(combustivel);
   const local_id = newIds[0];
    response.json({local_id,message:"Requisição POST"});

});

combustivelRouter.delete('/', async (request, response)=>{

    const id = request.query.id;
    
    const verificaCombustivel = await knex('combustivel').where({id:id}).first();

    if(!verificaCombustivel){
        
        return response.status(400).json({ message: `Combustivel não cadastrado ` });
    }
   
    const combustivel = await knex('combustivel').where({id:id}).delete();
    
    response.json(combustivel);

});

combustivelRouter.put('/', async (request, response)=>{
    const {nome} = request.body;
    const id = request.query.id;

    const verificaCombustivel = await knex('combustivel').where({id:id}).first();

    if(!verificaCombustivel){
        
        return response.status(400).json({ message: `Combustivel não cadastrado ` });
    }
    
    const combustivel = await knex('combustivel').where({id:id}).update({nome:nome});
    
    response.json(combustivel);
    
});
export default combustivelRouter;