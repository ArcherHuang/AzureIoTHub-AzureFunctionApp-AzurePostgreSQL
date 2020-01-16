module.exports = async (context, IoTHubMessages) => {
  context.log(`JavaScript eventhub trigger function called for message array: ${IoTHubMessages.deviceId}`)
  const pg = require('pg')

  const config = {
    host: '',
    user: '',
    password: '',
    database: 'iotdemo',
    port: 5432,
    ssl: true
  }

  const client = new pg.Client(config)
  client.connect(err => {
    if (err) throw err
    else {
      const query = 'insert into iotdata(deviceid, data) values(' + IoTHubMessages.deviceId + ',\'' + JSON.stringify(IoTHubMessages) + '\');'
      context.log(query)
      client
        .query(query)
        .then(() => {
          context.log('insert completed successfully!');
          client.end(console.log('Closed client connection'))
        })
        .catch(err => console.log(err))
        .then(() => {
          context.log('Finished execution, exiting now')
        })
    }
  })

}