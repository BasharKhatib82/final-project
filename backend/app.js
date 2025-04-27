// app.js
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { usersRouter } = require("./Routes/UsersRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
