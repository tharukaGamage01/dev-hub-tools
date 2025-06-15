require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/auth");
const toolRoutes = require("./routes/tool");
app.use("/api/tools", toolRoutes);
app.use("/api/auth", authRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
