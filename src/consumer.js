const { kafka } = require("./client");

function filterPassengerInfo(jsonObj) {
  let returnVal = null;

  console.log(`eventId ${jsonObj.eventId} received!`);

  if (jsonObj.bodyTemperature >= 36.9 && jsonObj.overseasTravelHistory) {
    returnVal = jsonObj;
  }

  return returnVal;
}

async function init() {
  const consumer = kafka.consumer({
    groupId: `coronavirus-updates-group`,
  });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["coronavirus-updates"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(`[${topic}]  PARTITON:   ${partition}`);

      const jsonObj = JSON.parse(message.value.toString());
      let passengerInfo = filterPassengerInfo(jsonObj);

      if (passengerInfo) {
        console.log(
          "******* Alert!!!!! passengerInfo *********",
          passengerInfo
        );
      }
    },
  });

  //   await consumer.disconnect();
}
init();
