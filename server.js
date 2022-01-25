const express = require('express');
const app = express();

app.get('/',function(request,response){
  response.send('여기는 나의 작업용 페이지입니다.');
});

app.listen(8080, function(){
  console.log('Listening at 8000');
});