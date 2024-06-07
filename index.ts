import express from 'express';
import session from 'express-session';
import { router as adminRouter } from './routers/admin';
import { router as userRouter } from './routers/users';
import { router as productRouter } from './routers/products';
import { router as orderRouter } from './routers/orders';
import { router as authRouter } from './routers/authentication';
import { initStruct } from './db/init-struct';
import { checkUserAuthentication, errorHandler, routeNotFoundHandler } from './middlewares';
import { UserRoles } from './lib/interfaces';
import { checkAuthorizationHeader, checkBearerToken, checkUserRole } from './middlewares/auth';

const app = express();
app.use(express.json());

app.use(session({
        secret: process.env.SESSION_KEY || "my-super-secret-key",
        cookie: { 
            maxAge: 60000 * 10//10min
        },
        resave: false,
        saveUninitialized: true
    })
);

app.use('/api',authRouter);
app.use(checkUserAuthentication);

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);

app.use('/api/admin',checkAuthorizationHeader);
app.use('/api/admin',checkBearerToken);
app.use('/api/admin',checkUserRole);
app.use('/api/admin',adminRouter);

app.use('*', routeNotFoundHandler);
app.use(errorHandler);

initStruct().then(() => {
    app.listen(process.env.API_PORT, () => {
      console.log(`
        Server running on port ${process.env.API_PORT}\n        
        http://localhost:${process.env.API_PORT}
      `);
    });
}).catch(err => {
    console.error("Failed to initialize the database structure:", err);
});

export { app };

declare module 'express-session' {
    export interface Session {
        userId: number;
        userRole: 'admin' | 'user';
        email: string; 
    }
}

declare module 'express' {
    export interface Request {
       authToken: string;
       userInfo: {
        userId: number,
        userRole: UserRoles,
        iat: number
       };
    }
}