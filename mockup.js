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







*/
