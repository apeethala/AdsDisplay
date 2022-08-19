import React,{useState,useEffect} from 'react';
import Searchresult from './Searchresult';


function App() {
 const [searchItem,setSearchitem]=useState("");
 const [searchData,setSearchData]=useState({});
 const [showAds,setShowAds]=useState(false);
 const [searchAutocomplt,setSearchAutocomplt] = useState([])
 const[showAutoComplt,setShowAutoComplt]=useState(false)
 const[showNoresult,setShowNoresult]=useState(false)
async function load(){
  fetch('http://localhost:5000/companies')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    setSearchAutocomplt(data);
  });
}
useEffect(()=>{
load();
},[])

function handleAutoComplt(name){
//alert(name);
setSearchitem(name);
setShowAutoComplt(false);
const input = document.getElementById('searchbox');
const end = searchItem.length;
input.setSelectionRange(end, end);
input.focus();


}
 function handleSearchItem(event){
   setSearchitem(event.target.value);
   setSearchData({});
   setShowAds(false);
   setShowAutoComplt(true);
   setShowNoresult(false);
  
  }
   
 
 async function handleKeyDown(event){
  if (event.key === 'Enter') {
   // alert(searchItem);
   await  fetch(`http://localhost:5000/companyAds/${searchItem}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data.result);
      if(data.result===null){
        setSearchData({});
        setShowAds(false);
        setShowNoresult(true);
      }
      else{  
        setSearchData(data.result);
        setShowAds(true);
      }
   
    });
  }
 }
  return (
    <div >
    <div className="search">
       <label> Search </label>
     <input
      type="text"
       value={searchItem}
       onChange={handleSearchItem}
       onKeyDown={handleKeyDown}
       id ="searchbox"
     />
    {
      showAutoComplt && searchAutocomplt.filter(data =>{
        let companyname=data.name.toLowerCase();
        let searched = searchItem.toLowerCase();
        return searched && companyname.includes(searched);
        
      })
      .map((data,index) =>{
        return(
          <div key={index} onClick={()=>{handleAutoComplt(data.name);}} className="autosearch">{data.name}</div>
        )
      })
    }
    { showAds &&  <Searchresult
             
             id={searchData.id}
             primaryText={searchData.primaryText}
             imageUrl={searchData.imageUrl}
             headLine={searchData.headLine}
             CTA={searchData.CTA}
           />
           }
       {showNoresult && <p>No ads found</p>}
       
    
    </div>
    
    </div>

  );
}

export default App;
