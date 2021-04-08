const { getDatabase } = require('../config/mongodb');

const { ObjectId } = require('mongodb');

class TvSeries {

  static readAll() {
    return getDatabase()
      .collection('TvSeries')
      .find()
      .toArray()
  }

  static create(input) {
    return getDatabase()
      .collection('TvSeries')
      .insertOne(input)
  }

  static readById(id) {
    return getDatabase()
      .collection('TvSeries')
      .findOne({_id: ObjectId(id)})
  }

  static findIdandUpdate(id, input) {
    return getDatabase()
      .collection('TvSeries')
      .updateOne({id: ObjectId(id)}, {$set: input})
  }

  static delete (id) {
    return getDatabase()
      .collection('TvSeries')
      .deleteOne({_id: ObjectId(id)})
  }

}

module.exports = TvSeries