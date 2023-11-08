/* start here
######################################################################################################################################
Header
######################################################################################################################################


const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) =>{}


^^^ to use thes we need to use  the aws software development kit^^^

######################################################################################################################################

exports.handler = async (event) => {}, is a common structure for defining the main entry point of an AWS Lambda function in Node.js. 
Here's a breakdown of this code:

exports.handler: This line exports a function named handler. 
In an AWS Lambda function, the handler function is the entry point that AWS Lambda invokes when your function is triggered.
async(event) => {}: 

This defines an asynchronous arrow function that takes an event as its input parameter. 
The event parameter typically contains information about the event that triggered your Lambda function, such as the HTTP request when your Lambda function is triggered via API Gateway.

event refers to the trigger in this case it will be from the Api gateway service 

######################################################################################################################################


######################################################################################################################################
Body 
######################################################################################################################################

Const Exam_Question =[]
Const score =  0

as the student answers correctly the score must increment thus a boolean is required

function isCorrect(){

}

we need a manner to map the correct answer with another DB perhaps  the Question as the key and the answer
as the value;


const params = {
  TableName: tableName,
};

function scanDynamoDB() {
  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.error('Error scanning DynamoDB table:', err);
    } else {
      // Process the scanned items and add them to the itemList
      data.Items.forEach((item) => {
        itemList.push(AWS.DynamoDB.Converter.unmarshall(item));
      });

      // If there are more items to scan, keep scanning
      if (typeof data.LastEvaluatedKey != 'undefined') {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        dynamodb.scan(params, scanDynamoDB);
      } else {
        // All items have been retrieved
        console.log('All items retrieved:');
        console.log(itemList);
      }
    }
  });
}

scanDynamoDB();
This code sets up an AWS DynamoDB client, specifies the table name, and then uses the scan operation to retrieve all items from the table. The retrieved items are unmarshalled and added to the itemList array. If there are more items to scan (indicated by data.LastEvaluatedKey), the function recursively calls itself to retrieve the remaining items. When all items have been retrieved, the list is printed to the console.

Make sure to replace 'YOUR_ACCESS_KEY_ID', 'YOUR_SECRET_ACCESS_KEY', 'us-east-1', and 'YourTableName' with your actual AWS credentials, desired region, and DynamoDB table name.
This will be all for phase One
######################################################################################################################################










*/
