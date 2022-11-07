import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const user = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    if (!req.body.username || !req.body.avatar) {
        res.status(400).send("Todos os campos são obrigatórios");
        // return
    }

    user.push(req.body);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    if (!req.body.tweet) {
        res.status(400).send("Todos os campos são obrigatórios");
        // return
    }
    const userAvatar = user.find(info => info.username === req.headers.user)?.avatar
    tweets.push({
        username: req.headers.user,
        avatar: userAvatar,
        tweet: req.body.tweet
    });
    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page)
    if (!page && page < 1) {
        res.status(400).send("informe uma pagina valida")
        return
    }
    if (page === 1) {
        res.send(tweets.slice(- 10).reverse());
        return
    }
    res.send(tweets.slice(-10 * page, -10 * page + 10).reverse());
})

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const userPosts = tweets.filter(infoPost => infoPost.username === username)
    if (userPosts.length <= 10) {
        res.send([...userPosts].reverse());
    } else {
        const lastUserPosts = userPosts.slice(userPosts.length - 10, userPosts.length).reverse();
        res.send(lastUserPosts);
    }
})

app.listen(5000);