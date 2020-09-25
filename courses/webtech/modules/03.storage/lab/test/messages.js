
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it.skip('list empty', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([])
  })
  
  it.skip('list one message', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // and a message inside it
    await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({content: 'Hello ECE'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([{
      creation: /^d+$/,
      content: 'Hello ECE'
    }])
  })
  
  it.skip('add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({content: 'Hello ECE'})
    .expect(201)
    message.should.match({
      creation: /^d+$/,
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    messages.length.should.eql(1)
  })
  
})
