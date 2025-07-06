import kafka from "../config/KafkaClient";
import { saveOrder } from "../controllers/order_Controlers"

const consumer = kafka.consumer({ groupId: "order-group" });

export const processOrders = async () => {

  try {

    await consumer.connect();
    await consumer.subscribe({ topic: "Order", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const order = JSON.parse(message.value!.toString());
        console.log(`📩 Processing order: ${order.userId}`);

        // Simulate saving to DB
        saveOrder(order);
      },
    });

  } catch (err) {
    console.log(err)
  }


};
