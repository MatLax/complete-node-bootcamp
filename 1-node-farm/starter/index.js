const fs = require(`fs`);
const http = require(`http`);
const url = require(`url`);

////////////////////// SERVER //////////////////////

// BLOCKING WAY to integrate the API, more efficient this way (see in const pathName for details)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === `/` || pathName === `/overview`) {
    res.end(`This is the OVERVIEW`);
  } else if (pathName === `/product`) {
    res.end(`This is the PRODUCT`);
  } else if (pathName === `/api`) {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    /* 
    // NON-BLOCKING WAY, more efficient to execute it in a blocking way so it doesn't get executed every time there's a new request

    fs.readFile(`${__dirname}/dev-data/data.json`, `utf-8`, (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data); 
      */
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world!",
    });
    res.end(`<h1>Page not found.</h1>`);
  }
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listening to requests on port 8000`);
});

////////////////////// THEORICAL SECTION //////////////////////////
/* 
// Blocking synchronous way
const textIn = fs.readFileSync(`./txt/input.txt`, `utf-8`);
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync(`./txt/output.txt`, textOut);
console.log(`File written!`); 
*/

/*
// Non-blocking, asynchronous way
fs.readFile(`./txt/start.txt`, `utf-8`, (err, data) => {
  // After it's done reading the file it launches a function, the first variable is always the error code
  console.log(data);
});
console.log(`Will read file!`); // This will appear first when executing index.js even though it comes second in the code because it doesn't get blocked by fs.readFile
 */

/* 
// Non-blocking, asynchronous way with callback (callback hell in fact, see triangle)
fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
  if (err) return console.log(`ERROR!`);
  // This reads the text in start.txt and stores it to data1
  fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
    // ${data1} is the text included in the file start.txt which is read-this, therefore the second function opens read-this.txt and stores the text to data2
    console.log(data2);
    fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
      // Same as the first function but for the text in append.txt in data3
      console.log(data3);
      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, (err) => {
        // Creates a file called final.txt with the text stored in data2 and data3 in it
        console.log(`Your file has been written!`);
      });
    });
  });
});
console.log(`Will read file!`); // This happens first while the rest of the code is executed
 */
/* 
Syncronous vs asynchronous code (blocking vs non-blocking)

Synchronous: All processes are executed one after another, line by line. Ex.:
*/

/* 
const fs = require (`fs`);

// Blocking code execution
const input = fs.readFileSync(`input.txt`, `utf-8`);
console.log(input);
 */
/*
Asynchronous: Offload heavy work to be worked in the background.
*/
/* 
const fs = require (`fs`);

// Non-blocking code execution
fs.readFile(`input.txt`, `utf-8`, (err,data) => {});
console.log(`Reading file...`); 
*/

/* 
Nodejs is single threaded, that means all users access the app together, if one blocks the process with synchronous code then all the other users need to wait for them. That's why we use a lot of callback functions in Nodejs
*/
