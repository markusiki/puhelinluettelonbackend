const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connectig to mongoDB:', error.merrage)
  })

const personSchema = new mongoose.Schema({
  name:
    {
      type: String,
      minlength: 3,
      required: true
    },
  number:
    {
      type: String,
      minlength: 8,
      validate:
        {
          validator: function(v) {
            return /^(\d{2,3}-)\d{5,}$/.test(v)
          },
          message: () => 'The first part of the number must be 2 or 3 numbers and be sapareted\
             from the rest of the numbers by "-" for example 040-123456 or 09-123456'
        },
    },

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
