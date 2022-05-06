const registerRouter = require("./register");
const loginRouter = require("./login");
const homeRouter = require("./home");
const favoriteListRouter = require("./favorite-list")
const roomRouter = require("./room")
function route(app) {
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/favoriteList", favoriteListRouter)
  app.use('/room', roomRouter)
  app.use("/", homeRouter);
}

module.exports = route;
