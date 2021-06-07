const EventEmitter = require('events')
class MyEmitter extends EventEmitter {} // new class inherits from EventEmittler
const myEmitter = new MyEmitter() // create a new instance of MyEmitter
myEmitter.on('event', () => { // what happens when the event is fired
 console.log('an event occurred!')
})
myEmitter.emit('event') // fire the event
