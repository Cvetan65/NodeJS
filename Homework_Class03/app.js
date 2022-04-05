const path = require('path');

const fs = require('fs');

const pathToApp = path.join(__dirname, 'app.js'); 
console.log(pathToApp);

fs.writeFileSync('homework.txt', 'Hello from our first Node homework')

const appendData = '\nFINISHED'

fs.appendFileSync('homework.txt', appendData, 'utf8')

const data = fs.readFileSync(__dirname + '/homework.txt', 'utf8');
console.log(data);
