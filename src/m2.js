const MicroMQ = require("micromq");
require("dotenv").config();

var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

const app = new MicroMQ({
    name: "m2",
    rabbit: {
        url: process.env.RABBIT_URL,
    },
    microservices: ["m1"],
});

app.action("multipy", async (meta, res) => {
    logger.info("got meta from  m1");
    if (!meta.data.number) {
        logger.error("number's variable hasn't recieved");
        res.json({ status: 400, error: "Bad data" });
    }

    if (typeof meta.data.number !== "number") {
        logger.error("number's variable isn't number");
        res.json({ status: 400, error: "Invalid data" });
    }

    setTimeout(() => {
        logger.info("send response to m1");
        res.json({ status: 200, number: meta.data.number * 2 });
    }, 5000);
});

app.start();
logger.info("microservice 'm2' has started working");
