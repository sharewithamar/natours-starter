//const fs = require('fs');
const Tour = require('./../models/tourModel');

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
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
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
      message: 'Invalid data sent'
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

exports.deleteTour = (req, res) => {
  // note just for learning express - acutal patch update on file not implemented

  //204 - no content status - sent for delete operations
  res.status(204).json({
    status: 'success',
    data: null
  });
};
