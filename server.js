const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const authUser = require("./app/routes/auth.routes");
const students = require("./app/routes/student.routes");
const teacher = require("./app/routes/teacher.routes");
const semester = require("./app/routes/semester.route");
require("dotenv").config({ path: __dirname + "/.env" });

var admin = require("firebase-admin");

var serviceAccount = require("./webrtc-30da6-firebase-adminsdk-ai6ug-720bfbcce9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mern Authentication" });
});

//routes
app.use("/", authUser);
// app.use("/", retriveUser);
app.use("/", students);
app.use("/", teacher);
app.use("/", semester);

app.post("/broadcast", (req, res) => {
  // The topic name can be optionally prefixed with "/topics/".
  const condition = "'broadcast' in topics";

  // See documentation on defining a message payload.
  const message = {
    webpush: {
      notification: {
        title: req.body.title,
        body: req.body.body,
        icon: req.body.image,
      },
    },
    condition: condition,
  };

  // Send a message to devices subscribed to the provided topic.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      res.send(response);
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.send(error);
      console.log("Error sending message:", error);
    });
});

app.post("/init-notification", (req, res) => {
  admin
    .messaging()
    .subscribeToTopic([req.body.id], "broadcast")
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      res.send(response);

      console.log("Successfully subscribed to topic:", response);
    })
    .catch((error) => {
      res.send(error);
      console.log("Error subscribing to topic:", error);
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

var serverL = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const server = require("http").createServer(app);

const io = require("socket.io")(serverL, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const socketManage = require("./socketManage")(io);
io.on("connection", socketManage);
