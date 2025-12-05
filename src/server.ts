import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express()
const port = 5000;

initDB();


app.use("/user")


// ! Default Get.
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});


// ! Server Listing.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
