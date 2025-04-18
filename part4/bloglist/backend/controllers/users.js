const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  response.json(
    await User.find({}).populate("blogs", { title: 1, url: 1, likes: 1, id: 1 })
  );
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || password === undefined)
    return response.status(400).send("Missing password or username");

  if (password.length < 3)
    return response.status(400).send("Password is too short");

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
