const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "understanding-kafka-nodejs",
  brokers: ["localhost:9092"],
});
