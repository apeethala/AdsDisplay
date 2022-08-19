const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
app.use(cors());
app.use(express.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost:27017/CompaniesDB');

const companyAdsSchema = new mongoose.Schema({
    id:Number,
    companyId:Number,
    primaryText:String,
    headLine:String,
    description:String,
    CTA:String,
    imageUrl:String
 });

 const companyAds = mongoose.model('companyAds', companyAdsSchema);

const companiesSchema = new mongoose.Schema({
     Id:Number,
     name:String,
     url:String
  });

  const companies = mongoose.model('companies', companiesSchema);

app.get('/companyAds/:searchItem',function(req,res){
    let searchItem =req.params.searchItem;
    let searchItemId;
    console.log(req.params.searchItem);
    companies.findOne({name:searchItem},function(err,result){
        if(!err){
          //  console.log("*******************"+result)
            if(result===null){
                res.send({result:null})
            }
            else{
                searchItemId = result.Id;
                companyAds.findOne({companyId:searchItemId},function(err,records){
                  if(!err){
                   // console.log(records);
                    if(records===null){
                        res.send({result:null})
                    }
                    else{ 
                         res.send({result:records})
                        }
                  
                  }
                  else{console.log(err)}
                })
            }
         
        }
        else{console.log(err)}
    })
});
app.get('/companies',function(req,res){
    companies.find({},function(err,results){
        if(!err){
            res.send(results);
        }
        else{console.log(err)}
    })
})

app.listen("5000",function(){
    console.log("server running on port 5000");
})