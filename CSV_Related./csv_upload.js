const AWS = require('aws-sdk');

// Create an S3 instance
const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
       
       
        // Create a CSV string
        const csvData = `"Question","Answer"\n"${event.question}","${event.answer}"\n`;

        // Define the S3 bucket and file name
        const bucketName = 'testsystemstorage';
        const fileName = 'output.csv';

        // Upload the CSV data to S3
        await s3.putObject({
            Bucket: bucketName,
            Key: fileName,
            Body: csvData,
        }).promise();

        // Return a response indicating success
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'CSV file uploaded to S3 successfully' }),
        };

        return response;
    } catch (error) {
        // Handle errors
        console.error('Error:', error);

        // Return an error response
        const response = {
            statusCode: 500,
            body: JSON.stringify({ message: error}),
        };

        return response;
    }
};
