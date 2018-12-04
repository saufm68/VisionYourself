const express = require("express");
const db = require("./db");
const { resolve } = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");

const app = express();
const http = require("http").Server(app);
const io = socketIo(http);

app.use(express.static("dist"));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

io.on("connection", socket => {
  socket.on("join", room => {
    socket.join(room);

    socket.on("rgblind", status => {
      socket.broadcast.to(room).emit("rgblind", status);
    });

    socket.on("change", phase => {
      socket.broadcast.to(room).emit("change", phase);
    });

    socket.on("acquity", data => {
      socket.broadcast.to(room).emit("acquity", data);
    });

    socket.on("astigmatism", data => {
      socket.broadcast.to(room).emit("astigmatism", data);
    });

    socket.on("end", data => {
      socket.broadcast.to(room).emit("astigmatism", data);
    });
  });

  socket.on("leave", room => {
    socket.leave(room);
  });
});

require("./routes")(app, db);
app.get("*", (req, res) =>
  res.sendFile(resolve(__dirname, "..", "..", "public", "index.html"))
);

//PORT
const PORT = process.env.PORT || 8080;
const server = http.listen(PORT, () => console.log("Listening on port 8080!"));
//Run clean up actions when server shuts down
server.on("close", () => {
  console.log("closing server");

  db.pool.end(() => {
    console.log("Shut down database connection");
  });
});
