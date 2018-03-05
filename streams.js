#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { Writable, Transform } = require('stream')

let [,,filePath, formatPath] = process.argv;

const readStream = fs.createReadStream(filePath);
readStream.on('data', buffer => (
  process.stdout.write(`${buffer.toString()}\n`)
))

const allCaps = Transform();
allCaps._transform = (buffer, _, cb) => {
  cb(null, `${buffer.toString().toUpperCase()}\n`)
}


const writeToFile = Writable();
writeToFile._write = (buffer, _, cb) => {
  cb( fs.writeFile(formatPath, buffer, (err) => {
    if (err) throw err;
    console.log('The data was appended to file!');
  }))
}


readStream.pipe(allCaps).pipe(writeToFile);









