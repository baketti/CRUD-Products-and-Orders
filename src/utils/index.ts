import { Express } from 'express';
import { initGlobalStore } from './global-store';

export async function initApplication(app: Express) {
	try {
        await initGlobalStore();
        app.listen(process.env.API_PORT, () => {
            console.log(`
                Server running on port ${process.env.API_PORT}\n        
                http://localhost:${process.env.API_PORT}
            `);
        });
    }catch (err) {
        console.error("Failed to initialize the global store:", err);
    }
}