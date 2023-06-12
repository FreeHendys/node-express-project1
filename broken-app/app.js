const express = require('express');
var bodyParser = require('body-parser')
let axios = require('axios');
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let jsonParser = bodyParser.json()

app.post('/',jsonParser,async function(req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(d => {
      return axios.get(`https://api.github.com/users/${d}`);
    }));
    let out = results.map(r => ({ name: r.data.login, bio: r.data.bio }));
    return res.json(out);
  } catch {
    console.log(e)
    next(e);
  }
});

app.listen(3000, function() {
  console.log('App on port 3000')
});
