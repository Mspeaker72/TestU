exports.handler = async (event) => {
    
    function isCorrect(answer){
   return true;  
   }
   
   
   var score = 0;
   
 
 if(event.message=="get_question"){
   
  
  const reply = {
    status :"pulling from DynamodB",
    question: "current_question ",
    answer: "list of answers",
    statusCode : 200
  }
  return reply;
 }
 
 
 if(event.answer!=null){
     
    if(isCorrect(event.answer)){
        score=+1;
        const reply = {
    status :"evaluating ",
    score: score,
    statusCode : 200
  }
  return reply;
    }
 }
}