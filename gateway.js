const Gateway = require("micromq/gateway");

var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info";

require("dotenv").config();
const gateway = new Gateway({
    microservices: ["m1", "m2"],
    rabbit: {
        url: process.env.RABBIT_URL,
    },
});

gateway.post("/multipy", (req, res) => res.delegate("m1"));

gateway.listen(process.env.PORT);
logger.info(`server start listening on port ${process.env.PORT}`);
