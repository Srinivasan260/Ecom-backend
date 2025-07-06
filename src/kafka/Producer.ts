import kafka from "../config/KafkaClient";

const producer = kafka.producer();



export const placeOrder = async(userId:string,products:string[],totalAmount:Number)=>{

    try{

 
        await producer.connect()
        await producer.send({
            topic:"Order",
            messages:[{ value :JSON.stringify({ userId,products,totalAmount,status:"Pending"})}],
        });
    
        console.log(` Order ${userId} sent to kafka`)
        await producer.disconnect()

    }catch(err){
        console.log(err)
    }
   


}