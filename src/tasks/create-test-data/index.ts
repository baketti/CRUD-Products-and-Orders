import { Product } from "@/db/models/Product";
import { User } from "@/db/models/User";
import { initStruct } from "@/db/init-struct";
import { test_users } from "../data/users";
import { test_products } from "../data/products";
import { productsIds } from "../data/products";
import { insertTestOrderToDB } from "../data/orders";

(async() => {
  try{
    await initStruct();
    await Product.bulkCreate(test_products);
    await User.bulkCreate(test_users);
    const users = await User.findAll({where: {role: 'user'}});
    users.map(async (user,i) => {
      const userId = user.getDataValue('id'); 
      await insertTestOrderToDB(userId, productsIds[i]);
    });
  }catch(error){
    console.error("Error while creating test data: ", error);
  }
})().then(() => console.log("Test data created successfully!"));