const { parse } = require('csv-parse');
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const s3 = new AWS.S3();
    const parser = parse({ delimiter: ',', from_line: 2 });

    let questions = {}; // Use an object to store questions and answers

    try {
        if (event.message === "start") {
            const S3params = {
                Bucket: "testsystemstorage",
                Key: event.file,
            };

            const data = await s3.getObject(S3params).promise();
            const csvData = data.Body.toString('utf-8');

            parser.write(csvData);
            parser.end();

            return new Promise((resolve, reject) => {
                parser.on('readable', function () {
                    let row;
                    while ((row = parser.read())) {
                        const question = row[0].trim(); // Trim leading and trailing whitespaces
                        const answers = row.slice(1).map(answer => answer.trim()); // Trim each answer
                        questions[question] = answers;
                    }
                });

                parser.on('end', async function () {
                    try {
                        const promises = Object.entries(questions).map(([question, answers]) => {
                            let params = {
                                TableName: 'TestQuestions',
                                Item: {
                                    question,
                                    answers,
                                },
                            };
                            return dynamodb.put(params).promise();
                        });

                        await Promise.all(promises);
                        resolve({ "message": "You have populated the DB" });
                    } catch (error) {
                        reject({ "error": "Error adding questions to DynamoDB", "details": error.message });
                    }
                });
            });
        }

        // Handle other cases or return a default response
        return { "message": "Not Found", "statusCode": 404 };
    } catch (error) {
        // Handle general errors
        return { "error": "An error occurred", "details": error.message };
    }
};
