const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

//for optional parameter use ? - eg /:id?
app.get('/api/v1/tours/:id', (req, res) => {
  //console.log(req.params)
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  //if (id > tours.length) {
    if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
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
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
// note just for learning express - acutal patch update on file not implemented
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
        status: 'fail',
        message: 'Invalid Id'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour :'<Updated new tour here>'
           }
    });
  });
  
  app.delete('/api/v1/tours/:id', (req, res) => {
    // note just for learning express - acutal patch update on file not implemented
        if (req.params.id * 1 > tours.length) {
            return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
          });
        }
        //204 - no content status - sent for delete operations
        res.status(204).json({
          status: 'success',
          data: null
        });
      });

/*app.get('/',(req,res)=>{
    //res.status(200).send('Hello from the server side');
    res.status(200).json({message:'Hello from the server side',app:'Natours'});

});

app.post('/',(req,res)=>{
    res.send('You can post to this endpoint')
})
*/
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
