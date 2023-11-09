// The csv file will contain the headings question , answer1,answer2,answer3,answer4
const fs = require('fs');
const csvParse = require('csv-parse');
//The deployment package will require fs and csv parse in order for the dump to work


questions = {};
// questions will be held within 

const csvFilePath = 'Test_questions.csv';
const answerFilePath = 'Test_answer.csv';

const stream = fs.createReadStream(csvFilePath);
// read the file in the specficied location

const parser = csvParse.parse({ delimiter: ',', from_line: 2 });
// read from line two and split with the comma;
stream.on('error', function (error) {
    console.error('Error reading CSV file:', error.message);
  })
  .pipe(parser)
  .on('data', function (row) {
    row.shift()
    // the question shouldn't be contained in the list thus 
    questions[row[0]] = row
    //the key is the question and the of answers the value
    
  })
  .on('error', function (error) {
    console.error('Error parsing CSV:', error.message);
  })
  .on('end', function () {
    console.log('CSV file successfully processed');
    console.log(questions["Hypertext Markup Language"])
  });
  
  





