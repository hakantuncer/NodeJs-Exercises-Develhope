const fs = require("fs");

const data = "Hello, world!";

fs.writeFile("message.txt", data, function (err) {
  if (err) throw err;
  console.log("The file has been saved!");
});
