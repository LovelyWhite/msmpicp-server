import express from "express"
const app = express();

app.get('/', (req, res) => {
  res.send('MSMPICP 后台!');
});
app.post("/upload",(req,res)=>{
    console.log(req.body);
    res.send("ok");
})

app.listen(5000, ()=> {
  console.log('Example app listening on port 5000!');
});