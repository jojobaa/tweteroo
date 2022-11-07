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
  if(tweets.length <= 10){
    res.send([...tweets].reverse());
  } else {
    const lastTweets = tweets.slice(tweets.length - 10, tweets.length).reverse();
    res.send(lastTweets);
  }
})

app.listen(5000);