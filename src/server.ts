import express from "express"
import {uploadToS3} from "./s3Client";
import { error } from "console";

const app = express()

app.use(express.json());

app.post("/upload", async(req , res) => {
    try{
        const data = req.body;

        if(!data){
            return res.status(400).json({
                error: "Must provide data for S3 upload"
            });
        }
            const key = `uploads/${Date.now()}.json`

            const url = await uploadToS3(key, data);

            res.status(200).json({
                message: "Upload Sucessfully",
                url
            });
    }catch(e: any){
        console.error(e);
        res.status(500).json({
            error: "Failed to upload",
            details: e.message,
        });

    }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))