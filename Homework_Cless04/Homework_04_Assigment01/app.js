const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    const db = JSON.parse(fs.readFileSync('db.json'));
    res.setHeader('Content-Type', 'text/html');
    return res.end(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Homework Class04-1</title>
      </head>
      <body>
          <div id="userInfo">
              First name: ${db.members[1].firstName}<br/>
              Last name: ${db.members[1].lastName}<br/>
              Gender: ${db.members[1].gender}<br/>
              Age: ${db.members[1].age}<br/>  
          </div><hr/>
          <form action="/enter-member" method="POST" style="color:blue;text-align:center;">
                  <div style="text-align:center;>
                      <div >
                          <label for="firstName">First name:</label>
                          <input type="text" id="firstName" name="firstName">
                      </div><br>
                      <div>
                          <label for="lastName">Last name:</label>
                          <input type="text" id="lastName" name="lastName">
                      </div><br>
                      <div>
                        <label for="gender">Gender: </label>
                        <input type="text" id="gender" name="gender">
                      </div><br>
                      <div>
                          <label for="age">Age: </label>
                          <input type="number" min="0" id="age" name="age">
                      </div><br>
                  </div>
                  <div>
                      <button type="submit">Create</button>
                  </div>
          </form>
      </body>
      </html>`);
  }
  if (req.url == '/enter-member' && req.method == 'POST') {
    let chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      // console.log(chunks);
      const dataString = Buffer.concat(chunks).toString();
      const splitedData = dataString.split('&');
      console.log(splitedData);
      const memb = [];
      splitedData.map(item  => {
        const divi = item.split('=')
        console.log(divi);
        const key = divi[0];
        console.log(key);
        const val = divi[1];
        console.log(val);
        if(key == 'firstName') {
          memb.push(val)
        }else if(key == 'lastName'){
          memb.push(val)
        }else if(key == 'gender'){
          memb.push(val)
        }else if(key == 'age'){
          memb.push(val)
        }
      });
      console.log(memb);
      const new_member = {firstName: memb[0], lastName: memb[1], gender: memb[2], age: memb[3]}
      console.log(new_member);
      const db = JSON.parse(fs.readFileSync('db.json'));
      db.members.push(new_member);
      fs.writeFileSync('db.json', JSON.stringify(db));

      res.writeHead(302, { Location: '/' });
      return res.end();
    });
  }
});

server.listen(3000);
