import express from 'express';
import request from 'request';
// Set up the express app
const app = express();
// get all todos
app.get('/api', (req, res) => {
  request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
     }
  })
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


