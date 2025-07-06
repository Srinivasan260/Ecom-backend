import dotenv from "dotenv";
import { Kafka, logLevel } from "kafkajs";
import fs from "fs";
dotenv.config();


const KAFKA_BROKER = process.env.KAFKA_BROKER!;
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID!;

const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
     brokers: [KAFKA_BROKER], 
    ssl: {
      rejectUnauthorized: true,
      ca: [fs.readFileSync("src/config/certs/ca.pem", "utf-8")], 
      key: fs.readFileSync("src/config/certs/service.key", "utf-8"), 
      cert: fs.readFileSync("src/config/certs/service.cert", "utf-8"), 
    },
  });

  export default kafka