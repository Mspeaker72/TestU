const fs = require('fs');

/*Common use for the File System module:
-Read files
-Create files
-Update files
-Delete files
-Rename files
*/
AWS.config.update({region:'eu-north-1'});
const s3 = new AWS.S3();

function upload_csv_to_s3(filePath,s3bucketname,Key_name){
  
  const fileContent = fs.readFileSync(filePath);
  
  const params = {
        Bucket: s3bucketname,
        Key: Key_name,
        Body: fileContent,
    };
    
    return s3.upload(params).promise();

}


exports.handler = async (event) => {
  
  if(event.message =='upload_csv'){
    
    const success = {
    statusCode: 200,
    body:"file has been uploaded to database",
    };
    
     const failure = {
    statusCode: 500,
    body:"an error has occured during the upload process , please check format",
    };
    
    upload_csv_to_s3(event.filepath,event.s3bucketname,event.templateName)
    .then(success=> {
      return success;
    })
    .catch(failure=>{
      return failure
    });
    
  }
  
  const defaultResponse = {
    statusCode: 404,
    body: "Nothing was found , invalid request"
  };
  return defaultResponse;
};
