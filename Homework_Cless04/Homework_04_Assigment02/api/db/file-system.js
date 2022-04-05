const fs = require("fs");
const path = require("path");

const getData = (file) => {
    return fs.readFileSync(path.join(__dirname, file), (error) => {
      if (error) {
        throw error;
      }
    });
  };

  const addData = (data, file) => {
    let items = JSON.parse(getData(file));
  
    items = [...items, data];
  
    return fs.writeFileSync(
      path.join(__dirname, file),
      JSON.stringify(items),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };

  module.exports = {
    getData,
    addData
  };
