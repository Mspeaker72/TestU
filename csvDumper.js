// The csv file will contain the headings question , answer1,answer2,answer3,answer4
const fs = require('fs');
const csvParse = require('csv-parse');
//The deployment package will require fs and csv parse in order for the dump to work


questions = {};

const csvFilePath = 'Test_questions.csv';

const stream = fs.createReadStream(csvFilePath);

const parser = csvParse.parse({ delimiter: ',', from_line: 2 });

stream.on('error', function (error) {
    console.error('Error reading CSV file:', error.message);
  })
  .pipe(parser)
  .on('data', function (row) {
    row.shift()
    questions[row[0]] = row
    
  })
  .on('error', function (error) {
    console.error('Error parsing CSV:', error.message);
  })
  .on('end', function () {
    console.log('CSV file successfully processed');
    console.log(questions["Hypertext Markup Language"])
  });
  
  





