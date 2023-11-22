// The csv file will contain the headings question , answer1,answer2,answer3,answer4
const AWS = require("aws-sdk")
const fs = require('fs');
const csvParse = require('csv-parse');
//The deployment package will require fs and csv parse in order for the dump to work

let dynamodb = new AWS.DynamoDB.DocumentClient();
// new instance of dynamoBD

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
  .on('end', async function () {
    console.log('CSV file successfully processed');
    
    for (question in questions) {
        let params = {
            TableName: 'TestQuestions',
            Item: {
                question:  questions[question]
            },
        };

        try {
            await dynamodb.put(params).promise();
            console.log(`Successfully added question: ${question}`);
        } catch (error) {
            console.error('Error adding question to DynamoDB:', error.message);
        }
    }
});
  