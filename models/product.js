const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const productsPath = path.join(rootDir, "data", "products.json");
    fs.readFile(productsPath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    const productsPath = path.join(rootDir, "data", "products.json");
    fs.readFile(productsPath, (err, fileContent) => {
      if (err) {
        callback([]);
      }
      callback(JSON.parse(fileContent));
    });
  }
};
