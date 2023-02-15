require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

const aboutData = {
  name: "Kevin Park",
  photo: "https://media.licdn.com/dms/image/C4E03AQFsXUW0YGb4jQ/profile-displayphoto-shrink_400_400/0/1663880926327?e=1681948800&v=beta&t=wdJlCz6zimEXb3jII4OhUtC_aN0BEi8KCkrrPSXY-9M",
  text: ['I am a senior undergraduate student studying computer science at New York University. I moved to New York from Korea in middle school and since then, I have grown to love this city and the opportunities it has to offer. I have a strong passion for technology and programming, which led me to pursue a degree in computer science. During my time at university, I have learned a great deal about software engineering and I am eager to apply my knowledge and skills to real-world projects.',
          'In my free time, I enjoy traveling and exploring new places. I believe that travel provides valuable experiences and opportunities for personal growth. I also have a passion for rock climbing. Rock climbing challenges me physically and mentally, and helps me build strength, balance, and endurance.',
          'As I am looking for entry level software engineering jobs, I am confident that my background in computer science, my passion for technology and my drive to succeed, make me an excellent candidate for any organization. I am eager to work in a fast-paced environment and to collaborate with a team of talented individuals to deliver innovative and high-quality software solutions.'
        
        ],
};

app.get('/about_us', async (req, res) => {
  res.json(aboutData)
})

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
