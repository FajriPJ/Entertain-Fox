const { getDatabase } = require('../config/mongodb');
const { ObjectId } = require('mongodb');

class Movie{

  static readAll() {
    return getDatabase()
      .collection('Movies')
      .find()
      .toArray()
  }

  static create(input) {
    return getDatabase()
      .collection('Movies')
      .insertOne(input)
  }

  static readById(id) {
    return getDatabase()
      .collection('Movies')
      .findOne({_id: ObjectId(id)})
  }

  static findIdandUpdate(id, input) {
    return getDatabase() 
      .collection('Movies')
      .updateOne({_id: ObjectId(id)}, {$set: input})
  }

  static delete(id) {
    return getDatabase()
      .collection('Movies')
      .deleteOne({_id: ObjectId(id)})
  }
}

module.exports = Movie
