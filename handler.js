'use strict';
const dbjs = require('./db.js');
module.exports.hello = async event => {
  const db = await dbjs.get();
  const dues =  db.collection('dues')
  const defaultersList = await dues.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "studentInfo"
      }
    },
    {
      $unwind: "$studentInfo"
    },
    {
      $match: {
        due_date: { $lt: new Date() }  
      }
    },
    {
      $group: {
        _id: "$studentInfo.name",
        due_date: { $min: "$due_date" }
      }
    },
    {
      $project: {
        _id: 0,
        student_name: "$_id",
        due_date: 1
      }
    }
  ]).toArray()
  return { statusCode: 200, body: JSON.stringify({ defaultersList: defaultersList })  };
};


