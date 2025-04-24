import { Sequelize } from "sequelize";
const db_URL = process.env.DATABASE_URL as string;

export const sequelize = new Sequelize(db_URL,{
    dialect: 'postgres',
    logging: true,
});

export const startConnectionDatabase = ()=>{
    try{
        sequelize.authenticate()
        .then(()=>{
            console.log(`Conectou no banco de dados! ✔️✔️✔️`)
        })
        .catch((err)=>{
            console.error(`Não conectou: ${err}`);
        })

    }catch(err){
        if (err instanceof Error){
            console.error(`Erro: ${err}`)
        }else{
            throw new Error(`Erro desconhecido`)
        }
    }
}




