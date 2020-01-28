const express = require("express");
// const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Connected on Port ${PORT}`));
// const server = http.createServer(app);
const io = socketio.listen(server);

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost/absend_app",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) return console.log(err);
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.send("Server is up and Running");
});

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

io.on("connection", function(socket) {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
