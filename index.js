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

app.post("/tweets", (req, res) => {
    console.log(user)
    const userAvatar = user.find(info => info.username === req.body.username)?.avatar
    tweets.push({
		username: req.body.username,
		avatar: userAvatar,
		tweet: req.body.tweet
	});
    res.send("OK");
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