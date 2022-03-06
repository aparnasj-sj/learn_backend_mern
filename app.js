const express = require('express'); /// returns a function
const app = express(); // invoke the function

app.get('/' , (req,res)=>{
// 200 status code means OK
res.sendFile('./views/index.html',{root:__dirname});
})
app.get('/about' , (req,res)=>{
    // 200 status code means OK
    res.send("hello about ");
    })
    
// Server setup
app.listen(3000 , ()=>{
	console.log("server running");
});
