import { SequelizeDB } from ".";
import { initModels } from "./models/index";

export async function initStruct() {
    try {
        const sequelize = SequelizeDB.getConnection();
        //TEST CONNECTION
        await sequelize.authenticate();
        console.log("DB Connection has been established successfully!");
        //IF CONNECTION IS OK, INIT MODELS
        initModels(sequelize);
        //SYNC TABLES
        await sequelize.sync();
        //sync({ force: true }) to drop tables and recreate them    
        //sync({ alter: true }) to modify tables and apply changes after restart    
        console.log("DB structure initialized successfully!");
    }
    catch (e) {
      console.error("An error occurred while initializing DB structure...",e);
    }
  }