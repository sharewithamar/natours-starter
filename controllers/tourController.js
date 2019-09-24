//const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  //limit=5&sort=-ratingsAverage,price
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
 */

/* Mongo will automatically check for ID
exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`, typeof val);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }
  next();
}; */

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name or price information missing for the tour'
    });
  }
  next();
}; */
exports.getAllTours = async (req, res) => {
  //find method also converts the list of documents in to array of objects
  try {
    console.log(req.query);
    //BUILD THE QUERY
    //1) Filtering
    /*   const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query, queryObj);
    // console.log(req.query); - Returns query params

    //{difficulty:'easy', duration:{$gte:5}} - in mongodb query
    // { difficulty: 'easy', duration: { gte: '5' } }  - req.query    console.log(req.query);
    //2) ADVAnCED FILTERING
    //gte ,gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    //console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr)); // await will return the document. But for sorting and pagination it wont help so use query */

    //3)sorting
    /*  if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query.sort(sortBy);
      //sort('price ratingsAverage)
    } else {
      query = query.sort('-createdAt');
    } */

    //FIELD LIMITING
    /*  if (req.query.fields) {
      console.log('**', req.query.fields);

      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);
      query = query.select(fields);
      //query.select('name duration price') - known as projecting.
    } else {
      query = query.select('-__v');
    } */

    //4)pagination
    /*  const page = req.query.page * 1 || 1; //convert sting in to number by multiplying with 1
    const limit = req.query.limit * 1 || 100;
    // page=2&limit=10 . 1-10 page 1 ; 11-20 page 2 ; 21-30 page3
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numTours = await Tour.countDocuments(); // promise with number of countDocuments
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    query = query.skip(skip).limit(limit); */

    //EXECUTE THE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;
    //query.find().sort().select().skip().limit()  - each method returns a new query and we can chain next method untile we  the finally await the query

    //First way of writing filter query
    /*  const tours = await Tour.find({
      duration: 5,
      difficulty: 'easy'
    });
 */
    //Second way of writing filter query
    /*     const tours = await Tour.find()
      .where('difficulty')
      .equals('easy')
      .where('duration')
      .equals('5'); */

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    // console.log(err)
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id : req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

  //console.log(req.params)
  // const id = req.params.id * 1;
  /*   const tour = tours.find(el => el.id === id);

  //if (id > tours.length) {

  */
};

exports.createTour = async (req, res) => {
  /*   const newTour = new Tour({});
  newTour.save();
 */
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }

  // console.log(req.body);
  /*  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //  console.log(newTour);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      }); //201 status - created
    }
  ); */
};

exports.updateTour = async (req, res) => {
  // note just for learning express - acutal patch update on file not implemented
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //To send updated new document
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  // note just for learning express - acutal patch update on file not implemented

  //204 - no content status - sent for delete operations
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
