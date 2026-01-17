import app from "./server";
/// <reference path="./types/express-session.d.ts" />
app.listen(3000,()=>{
    console.log("Server started on http://localhost:3000");
});   