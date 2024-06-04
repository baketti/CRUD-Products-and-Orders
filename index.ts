import express from 'express';
import session, { Store } from 'express-session';
import { router as userRouter } from './routers/users';
import { router as productRouter } from './routers/products';
import { router as orderRouter } from './routers/orders';
import { initStruct } from './db/init-struct';
import SequelizeStore from 'connect-session-sequelize';
import { checkUserAuthentication, errorHandler } from './middlewares';

declare module 'express-session' {
    export interface SessionData {
      userId: number;
      userRole: 'admin' | 'user';
    }
}

const app = express();
app.use(express.json());

app.use(userRouter);
app.use('/api',productRouter);
app.use('/api',orderRouter);

app.use(errorHandler);

initStruct().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`
        Server running on port ${process.env.PORT}\n        
        http://localhost:${process.env.PORT}
      `);
    });
}).catch(err => {
    console.error("Failed to initialize the database structure:", err);
});
/* app.get('/', (req,res,next) => {
    if(!req.session) {
        req.session?.save();
        return res.send('Hello from the new session!')
    }
    res.send('Hello from the same session!')
}) */

/* app.get('/login',(req,res) => {
    res.send('login page');
}) */
//app.use(checkUserAuthentication);

/*  app.use(
    session({
        secret: "my-super-secret-key",
        store: new (SequelizeStore(Store))({
            db: sequelize,
            tableName: 'Sessions'
        }),
        resave: false,
    })
); */
//await sequelize.sync()

/* app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}\n
    http://localhost:${process.env.PORT}`);
}); */

export {app};