import express from 'express';
import cors from 'cors';
import request from 'request';

const app = express();

// https://expressjs.com/en/resources/middleware/cors.html
// This is CORS-enabled for all origins!
app.use(cors());

app.get('/api', (req, res) => {
//  console.log(req);
  console.log(decodeURIComponent(req.query.encodedUrl));
//  console.log(req.query.encodedUrl);
//  request('http://www.google.com', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body) // Print the google web page.
//     }
//  })
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


