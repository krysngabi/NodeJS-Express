const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const errorMiddleware = require('./middleare/errorMiddleware')
const jwt = require("jsonwebtoken");

app.use(express.json());

let refreshTokens = [];

const users = [];

//async and await are added because bcrypt is asynchronous
app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = { name: req.body.name, password: hashedPassword };

    users.push(user);
    res.status(201).send();
  } catch {
    req.status(500).send();
  }
});

app.post("/token", (req, res) => {
  //refresh token should be ideally saved in a DB

  const refreshToken = req.body.token;

  // console.log('tokenReceived ' + refreshToken + ' Tokens ' + JSON.stringify(refreshTokens))

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    //the user object has many data in it but we just need the name
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accesToken: accessToken });
  });
});

app.post("/login", (req, res) => {
  //Authenticate User

  const username = req.body.username;

  const user = { name: username };
  // the below code will generate a token without expiry
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  console.log("taille " + refreshTokens.length);
  res.json({ accesToken: accessToken, refreshToken: refreshToken });
});

app.post("/users/authenticate", async (req, res) => {
  //Authenticate User

  const user = users.find((u) => (u.name = req.body.name));

  console.log(user);

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  const pass = user.password;
  console.log("1. " + pass);

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send("An error occured");
  }
});

app.post("/logout", (req, res) => {
  //normally this should delete the refreshToken in the DB
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


const userRouter = require("./routes/userRoute");
const accountRouter = require("./routes/accountRoute");

app.use("/users", userRouter);
app.use("/accounts", accountRouter);
  
app.use(errorMiddleware)
app.listen(4000);

// app.use(errorMiddleware)
