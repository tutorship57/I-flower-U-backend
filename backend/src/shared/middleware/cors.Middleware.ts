import cors from 'cors';
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        const allow = ["http://localhost:5173","http://10.107.12.53:5173", "https://yourdomain.com"];
        if (!origin || allow.includes(origin)) {
            return callback(null, true);
        }
        else return callback(new Error("Not allowed by CORS"));
    },
    // origin: true,
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"],   
}

export const corsMiddleware = cors(corsOptions);