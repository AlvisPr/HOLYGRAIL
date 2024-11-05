var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient();

// Initialize Redis with default values
async function initializeRedis() {
    try {
        await client.connect();
        await client.mSet("header", 0, "Left", 0, "article", 0, "Right", 0, "footer", 0);
        const values = await client.mGet(["header", "Left", "article", "Right", "footer"]);
        console.log(values);
    } catch (err) {
        console.error(err);
    }
}

initializeRedis();

// Retrieve data from Redis
async function getData() {
    try {
        const values = await client.mGet(["header", "Left", "article", "Right", "footer"]);
        return {
            header: Number(values[0]),
            Left: Number(values[1]),
            article: Number(values[2]),
            Right: Number(values[3]),
            footer: Number(values[4])
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

app.use(express.static('public'));

// Retrieve data
app.get('/data', async function (req, res) {
    try {
        const data = await getData();
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

// Update data
app.get('/update/:section/:value', async function (req, res) {
    const key = req.params.section;
    const value = parseInt(req.params.value);

    if (isNaN(value)) {
        res.status(400).send('Invalid value');
        return;
    }

    try {
        const currentValue = await client.get(key);
        const newValue = Number(currentValue) + value;
        await client.set(key, newValue);
        const data = await getData();
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    }
});

app.listen(3000, function () {
    console.log('Running on port 3000!');
});