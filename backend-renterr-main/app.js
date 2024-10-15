require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const http = require("http");
const cors = require("cors");

const connectDB = require("./config/db.config");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send(
    "<h1 style='display: flex; justify-content: center;  align-items: center; font-size:9rem; margin-top:16rem;'>Welcome to Rentrr API server.</h1>"
  );
});

//Routes
// const tenantRoutes = require("./routes/tenant");
// const landlordRoutes = require("./routes/landlord");
const AuthRouter = require("./routes/auth.routes");
const maintenanceRouter = require("./routes/maintenance.routes");
const PropertyRouter = require("./routes/property.routes");
const TenantRouter = require("./routes/tenant.routes");
// use

// app.use("/api/tenants", tenantRoutes);
// app.use("/api", landlordRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api", maintenanceRouter);
app.use("/api", PropertyRouter);
app.use("/api", TenantRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

let server;

server = http.createServer(app);

const port = process.env.PORT || 3300;
server.listen(port, () =>
  console.log(`Server is running and listenning on ${port}`)
);

start();
