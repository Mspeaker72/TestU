const { readFile } = require('fs/promises');
const { parse } = require('csv-parse');
const AWS = require('aws-sdk');
const fs = require('fs');
const csvParse = require('csv-parse');

exports.handler = async (event) => {
    function isCorrect(answer) {
        return true;
    }

    let score = 0;
    const csvFilePath = `${__dirname}/Test_questions.csv`;
    const answerFilePath = 'Test_answer.csv';
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    const stream = fs.createReadStream(csvFilePath);
    const parser = csvParse.parse({ delimiter: ',', from_line: 2 });

    let questions = {}; // Use an object to store questions and answers

    if (event.message == "start") {
        return new Promise((resolve, reject) => {
            stream.on('error', function (error) {
                reject({ "error": "Error reading CSV file", "details": error.message });
            }).pipe(parser)
                .on('data', (row) => {
                
                    const question = row[0];
                    const answers = row.slice(1);
                    questions[question] = answers;
                })
                .on('end', async function () {
                    try {
                        const promises = [];

                        for (let question in questions) {
                            let params = {
                                TableName: 'TestQuestions',
                                Item: {
                                    question: question,
                                    answers: questions[question]
                                },
                            };
                            promises.push(dynamodb.put(params).promise());
                        }

                        await Promise.all(promises);
                        resolve({ "message": "You have populated the DB" });
                    } catch (error) {
                        reject({ "error": "Error adding questions to DynamoDB", "details": error.message });
                    }
                });
        });
    }


    if (event.message == "get_question") {
        const reply = {
            status: "pulling from DynamoDB",
            question: "current_question",
            answer: "list of answers",
            statusCode: 200
        };
        return reply;
    }

    if (event.answer != null) {
        if (isCorrect(event.answer)) {
            score += 1;
            const reply = {
                status: "evaluating",
                score: score,
                statusCode: 200
            };
            return reply;
        }
    }


    return { "message": "Not Found", "statusCode": 404 };
};

