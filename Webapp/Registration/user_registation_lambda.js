const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tablename = 'UserDatabase';

async function check(username) {
    const params = {
        TableName: tablename,
        KeyConditionExpression: 'Username = :value',
        ExpressionAttributeValues: {
            ':value': username,
        },
    };

    try {
        const results = await dynamodb.query(params).promise();

        return results.Items.length === 0;
        //boolean to compare length to 0
    } catch (error) {
        console.error('Error querying DynamoDB table:', error);
        throw error;
    }
}

async function checkemail(email) {
    const params = {
        TableName: tablename,
        FilterExpression: 'Email = :value', 
        ExpressionAttributeValues: {
            ':value': email,
        },
    };

    try {
        const results = await dynamodb.scan(params).promise();

        return results.Items.length === 0;
       //  non-primary keys require a scan , schema change in the future can prevent this.
    } catch (error) {
        console.error('Error scann DynamoDB table:', error);
        throw error;
    }
}





exports.handler = async (event) => {
    const { username, email, password } = event;

    try {
        const isUsernameValid = await check(username);
        const isUniqueEMail = await checkemail(email);

        if (!isUsernameValid) {
            return {
                statusCode: 400,
                message: 'Username already exists'
            };
        }
        
        if (!isUniqueEMail) {
            return {
                statusCode: 400,
                message: 'Email already exists'
            };
        }
        
        const params = {
            TableName: tablename,
            Item: {
                Username: username,
                Email: email,
                Password: password,
            },
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            message: 'Successfully registered.',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            message: 'Internal server error.',
        };
    }
};