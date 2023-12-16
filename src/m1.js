const MicroMQ = require("micromq");
require("dotenv").config();

var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

const app = new MicroMQ({
    name: "m1",
    rabbit: {
        url: process.env.RABBIT_URL,
    },
    microservices: ["m2"],
});

app.post("/multipy", async (req, res) => {
    logger.info("got request from gateway");
    logger.info("send meta to m2");
    const { response } = await app.ask("m2", {
        server: {
            action: "multipy",
            meta: {
                data: {
                    number: req.body.number,
                },
            },
        },
    });
    logger.info("got response from m2");
    res.json(response);
});

app.start();
logger.info("microservice 'm1' has started working");
