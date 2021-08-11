const { Kafka } = require('kafkajs')
var Chance = require('chance');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092','localhost:9093']
})
 
const producer = kafka.producer()
var chance = new Chance();
const produceMessage= async ()=>{
    try {
        await producer.send({
            topic: 'test-node',
            messages: [
              { value: chance.address() },
            ],
          })
    } catch (error) {
        console.log(error)
    }
}
const run = async () => {
  // Producing
  await producer.connect()
  setInterval(produceMessage,1000)
}
 
run().catch(console.error)