const express=require('express')
const multer = require('multer')
const path = require('path')
const hbs=require('hbs')
const fs = require('fs')
const app = express()




const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        const {originalname}=file;
        
        cb(null, originalname)


    }
})

const upload = multer({storage})


app.use(express.urlencoded({extended:true}));
app.use(express.json());




var filesList = [];
app.get('/list',(req,res)=>{
    const path = __dirname+'/uploads/';
    fs.readdir(path, function (err, files) {
        if (err) {
          res.status(500).send( "Files not found." );
        }
    
     
    
        files.forEach((file) => {
          filesList.push(file);
        });
    
})

res.send(filesList);
})


app.get('/list/:name',(req,res)=>{
    const name=req.params.name
    res.download(path.join(__dirname,`uploads/${name}`),(err)=>{
        res.status(500).send('the file cannot be downloaded..')
    })
})

app.post('/upload', upload.single('image'), (req,res)=>{
  
res.status(200).send('file is uploaded..')

})

app.listen(9000,()=>{
    console.log('server is running at port number: 9000')
})