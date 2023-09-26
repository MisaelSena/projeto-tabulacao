import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import app from "./app";

const main = async () => {
    try {

        await AppDataSource.initialize();
        console.log("Conectado ao Banco com Sucesso!");
        
        app.listen(3000, ()=>{
            console.log("Requisições na porta 3000.");
        });

    } catch (error) {
        console.log(error);
    }
}

main();