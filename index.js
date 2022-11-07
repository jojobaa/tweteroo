import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const user = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    user.push(req.body);
    res.send("OK");
})

app.listen(5000);