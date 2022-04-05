const express = require('express');
const cors = require('cors');
const fileSystem = require('./api/db/file-system');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  const mafia = fileSystem.getData('member.json');
  res.send(mafia);
});

app.post('/mufiusi', (req, res, next) => {
  console.log(req.body);
  const mufiusu = {
    imgSrc: req.body.imgSrc,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    description: req.body.description,
  };

  fileSystem.addData(mufiusu, 'member.json');

  res.send({
    message: 'Thanks for your input!'
  });
});

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log('Server is listening http://localhost:3300');
});
