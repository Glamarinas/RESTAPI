const express = require("express");
const userRoutes = require("./src/users/routes");
const announcementRoutes = require("./src/announcements/routes");



const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req,res)=> {
    res.send("Hello world!");
})

app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);

app.listen(port,() => console.log(`app listening on port ${port}`));