'use strict'

require('dotenv').config()

const Protocol = require('azure-iot-device-mqtt').Mqtt
const Client = require('azure-iot-device').Client
const Message = require('azure-iot-device').Message

const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING

const client = Client.fromConnectionString(deviceConnectionString, Protocol)

const connectCallback = err => {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Client connected');
    client.on('message', function (msg) {
      console.log(`Id:  ${msg.messageId}  Body: ${msg.data}`)
      client.complete(msg, printResultFor('completed'))
    })

    const sendInterval = setInterval(() => {
      const temperature = 20 + (Math.random() * 15)
      const message = new Message(JSON.stringify({
        deviceId: 6666,
        temperature: temperature,
        humidity: 60 + (Math.random() * 20)
      }))
      console.log(`Sending message: ${message.getData()}`)
      client.sendEvent(message, printResultFor('send'))
    }, 2000)

    client.on('error', err => {
      console.error(err.message)
    })

    client.on('disconnect', () => {
      clearInterval(sendInterval)
      client.removeAllListeners()
      client.open(connectCallback)
    })
  }
}

client.open(connectCallback)

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString())
    if (res) console.log(op + ' status: ' + res.constructor.name)
  };
}