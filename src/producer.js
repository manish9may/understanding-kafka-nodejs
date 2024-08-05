const { kafka } = require("./client");

const messages = require("./data/input.json");

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  let i = 0;
  setInterval(async () => {
    i = i >= messages.length - 1 ? 0 : i + 1;
    const payloads = {
      topic: "coronavirus-updates",
      messages: [
        { key: "coronavirus-alert", value: JSON.stringify(messages[i]) },
      ],
    };
    console.log("payloads =============>", payloads);
    await producer.send(payloads);
  }, 5000);
}

init();
