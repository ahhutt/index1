let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discound = document.getElementById('discound');
let total = document.getElementById('total');
let cound = document.getElementById('cound');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;






function getTotal()
{
if(price.value !=''){
let result = (+price.value + +taxes.value + +ads.value)
-discound.value;
total.innerHTML = result
total.style.background = '#040'
}else{
total.innerHTML = '';
total.style.background = '#bb0101'
}
}
let dataPro; 
if(localStorage.product != null)
{
  dataPro = JSON.parse(localStorage.product)
}else{
  dataPro = [];
}






submit.onclick = function(){
    let newPro = { 
      title:title.value.toLowerCase(), 
      price:price.value, 
      taxes:taxes.value,
      ads:ads.value, 
      discound:discound.value, 
      total:total.innerHTML, 
      cound:cound.value, 
      category:category.value.toLowerCase(),
    }
    if(title.value != ''
      &&price.value !=''
      &&category.value !=''
      &&newPro.cound < 100){
       if(mood === 'create'){
      if(newPro.cound > 1 ){
      for(let i = 0; i < newPro.cound;i++){
        dataPro.push(newPro);
      } 
    }else{
      dataPro.push(newPro);
    }

    }else{
       dataPro[  tmp  ] = newPro
       mood = 'create';
       submit.innerHTML = 'create';
       cound.style.display = 'block'

    }
    clearData()
    }
    
   
    
    
    localStorage.setItem('product', JSON.stringify(dataPro))
    
    showData()

  }
function clearData(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discound.value = '';
total.innerHTML = '';
cound.value = '';
category.value = '';
}
function showData(){
  getTotal() 
  let table = ''; // Initialize table as an empty string
  for (let i = 0; i < dataPro.length; i++){
    table += `
     <tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discound}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updadeData(${i})" id="updade">updade</button></td>
          <td><button onclick="deleteData(${i})" id="updade">delet</button></td>
         
        </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelet = document.getElementById('deletALL');
  if(dataPro.length > 0){
    btnDelet.innerHTML =  ` 
    <button onclick= "deleteAll()">deleteAll(${dataPro.length }) </button> 
    `
  }else{
    btnDelet.innerHTML = '';
  }
}
showData()




function deleteData(i)
{
  dataPro.splice(i,1)
  localStorage.product = JSON.stringify(dataPro);
  showData()
}
function deleteAll(){
  localStorage.clear()
  dataPro.splice(0)
  showData()
}





 function updadeData(i){
  title.value = dataPro[i].title
price.value = dataPro[i].price
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
discound.value =dataPro[i].discound
getTotal()
cound.style.display = 'none'
cound.value = dataPro[i].cound
submit.innerHTML = 'updade';
mood = 'update';
tmp = i;
scroll({
  top:0,
  behavior:'smooth',
})


}
 




let searchMood = 'title';
function getsearchMood(id)
{
  let search =document.getElementById('search')
  if(id == 'searchTitle'){
    searchMood = 'title';
    search.placeholder =  'search By Title'
  }else{
    searchMood = 'category';
    search.placeholder = 'search By category'
  }
  search.focus()
  search.value = '';
  showData()
}
  
function searchDate(value)
{
  let table = ' ';
  if(searchMood == 'title')
  {
    for(let i = 0; i < dataPro.length;i++){
      if(dataPro[i].title. includes(value.toLowerCase())){
        table += `
        <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discound}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updadeData(${i})" id="updade">updade</button></td>
             <td><button onclick="deleteData(${i})" id="updade">delet</button></td>
            
           </tr>
       `;
          }
        }

  }else{
     for(let i = 0; i < dataPro.length;i++){
      if(dataPro[i].category.includes(value)){
        table += `
        <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discound}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updadeData(${i})" id="updade">updade</button></td>
             <td><button onclick="deleteData(${i})" id="updade">delet</button></td>
            
           </tr>
       `;
          }
        }

  }
  document.getElementById('tbody').innerHTML = table;

}











 