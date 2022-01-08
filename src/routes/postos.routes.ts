import { Router } from 'express';
import knex from '../database/connection';

const postosRouter = Router();

postosRouter.get('/', async (request, response)=>{

    const nome = request.query.nome;
    
    if(nome){
        const verificaPosto = await knex('postos').where({nome:nome}).first();

        if(!verificaPosto){
            
            return response.status(400).json({ message: `Posto não cadastrado ` });
        }
    const posto = await knex('postos').where({nome:nome}).select('*');
    
    response.json(posto);
    }
    else{
        const posto = await knex('postos').select('*');
        response.json(posto);
    }

});

postosRouter.post('/', async (request, response)=>{

    const {nome,cidade,uf,endereco,combustiveis} = request.body;
    const posto = {
        nome,
        cidade,
        uf,
        endereco
    };
    
    await combustiveis.map( async(id:number)=>{       

        const selectedCombustivel = await knex('combustivel').where('id',id).first();

        if(!selectedCombustivel){
            
            return response.status(400).json({ message: `Combustivel não cadastrado id: [${id}]` });
        } 
        
    });

    const newIds= await knex('postos').insert(posto);
    const local_id = newIds[0];

    
    const postos_combustivel = await combustiveis.map( async(id:number)=>{ 
        const obj= {
            combustivel_id:id,
            postos_id:local_id            
            };      
            await knex('postos_combustivel').insert(obj);
     });
    
      console.log('2', postos_combustivel);
   

   
    response.status(200).json({local_id,message:"Requisição POST"});


});

postosRouter.delete('/', async (request, response)=>{

    const id = request.query.id;

    const verificaPosto = await knex('postos').where({id:id}).first();

    if(!verificaPosto){
        
        return response.status(400).json({ message: `Posto não cadastrado ` });
    }
   
    const posto = await knex('postos').where({id:id}).delete();
    
    

    response.json(posto);
});

postosRouter.put('/', async (request, response)=>{
    const {nome} = request.body;
    const id = request.query.id;

    const verificaPosto = await knex('postos').where({id:id}).first();

    if(!verificaPosto){
        
        return response.status(400).json({ message: `Posto não cadastrado ` });
    }
    
    const posto = await knex('postos').where({id:id}).update({nome:nome});
    
    response.json(posto);
    
});

export default postosRouter;