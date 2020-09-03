const express = require("express");
const cors = require("cors");
const app = express();

let rabbitMQ = require('./rabbitMq.js');
let userData = require('./userData');


app.use(cors({
    exposedHeaders: ['Content-Length', 'Content-Type'],
}));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/getuserData", function (req, res) {
    res.send(userData.data.sort((a, b) => a.name.localeCompare(b.name)))
})

app.post('/updateuserData', async (req, res) => {
    try {
        const updateUser = req.body;

        findAndUpdateUser(updateUser);

        console.log("userData:" + JSON.stringify(userData.data));
        console.log("User:" + JSON.stringify(updateUser));

        rabbitMQ("updateUser", JSON.stringify(updateUser));

        return res.status(200).json({ status: "succesfully update" });
    } catch (error) {
        res.status(500).send(error);
    }
})

function findAndUpdateUser(updateUser) {
    findUserIndex = userData.data.findIndex(o => o.name === updateUser.name);
    userData.data.splice(findUserIndex, 1);
    userData.data.push(updateUser);
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
