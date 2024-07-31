window.onload = () => {
    let data = localStorage.getItem('CharityJWT');
    if (data) {
        let me = document.getElementById('navbar');
        let tm = document.createElement('button');
        tm.className = 'link-Item br';
        tm.onclick = deleteJwt; // Assign function reference
        tm.innerText = 'Logout';

        me.appendChild(tm);
    }else{
        window.location = '../login/login.html'; 
    }
};

function deleteJwt() {
    localStorage.removeItem('CharityJWT');
    localStorage.removeItem('charitysData')
    window.location = '../login/login.html';
}

function addcharity_item(){
    console.log('add');
    const Element=document.getElementById('Payments-container');
    Element.innerHTML=`<div class="flex" >
    <form class="add_charity_item" onsubmit="add_charity_item(event)">
        <label class="add_charity_lable">Title</label><br>
        <input class="add_charity_input" type="text" name="title" placeholder="Enter Title"><br>
        <label class="add_charity_lable">description</label><br>
        <textarea class="add_charity_input" type="text" name="description" placeholder="Enter description"></textarea><br>
        <label class="add_charity_lable">category</label><br>
        <select  class="add_charity_input" name="category" id="category">
        <option value="health">Health</option>
        <option value="food">Food</option>
        <option value="education">Education</option>
        <option value="money">Money</option>
        </select><br>
        <label class="add_charity_lable">IMgUrl</label><br>
        <input class="add_charity_input" type="file" name="img" accept="image/*" required placeholder="Enter Img Url"><br>
        <button class="add_charity_button" type="submit">Add</button>
    </form> 
    </div>`
}
async function add_charity_item(event){
    const CharityJWT=localStorage.getItem('CharityJWT')
    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('description', event.target.description.value);
    formData.append('category', event.target.category.value);
    formData.append('img', event.target.img.files[0]);
    try {
        const response = await axios.post('http://localhost:4000/charityAdmin/donationItemsDataCreate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${CharityJWT}`
            }
        });
        alert('item added')
    } catch (err) {
        alert(err)
    }
}

async function payments(){
    const CharityJWT=localStorage.getItem('CharityJWT');
    try{
        const data= await axios.get('http://localhost:4000/charityAdmin/payments',{
            headers:{
                'Authorization':`Bearer ${CharityJWT}`
            }
        })
        localStorage.setItem('charityPayments',JSON.stringify(data.data))
    }catch(err){
        if(err.response.status==401){
            alert('plese login');
            window.location='../login/login.html'
        }
    }

}

async function allPayments() {
    const token = localStorage.getItem('CharityJWT');
    try {
       const dataPost = await axios.get(`http://localhost:4000/charityAdmin/allpayments`, {
          headers: {
             'Authorization': `Bearer ${token}`
          }
       });
       displayPayments(dataPost.data);
       console.log(dataPost);
    } catch (err) {
        if(err.response.status==401){
            alert('plese login');
            window.location='../login/login.html'
        }
    }
 }
 
 function displayPayments(data) {
    let charityItems = document.getElementById('Payments-container');
   charityItems.className='payment-container'
   charityItems.innerHTML = `<h1 class="charity-heading-dom">Your Payments</h1>
   <div class="flex row"><div class="col-1 payment-heding">Amount</div>
   <div class="col-1 payment-heding">Status</div><div class="payment-heding col-2">product id</div>

   <div class="payment-heding col-2">Item title Name</div>
    <div class="payment-heding col-2">Doner Email</div>
   <div class="payment-heding col-2">paymentid</div></div>
   `
   for (let i = 0; i < data.length; i++) {
       let div = document.createElement('div');
       div.className = 'flex row'; 
       div.innerHTML = `<div class="col-1 payment-item">${data[i].amount}</div>
       <div class="payment-item col-1">${data[i].payment_status}</div>
       <div class="payment-item col-2">${data[i].donationItemId}</div>
      
        <div class="payment-item col-2">${data[i].donation_item.title}</div>
        <div class="payment-item col-2">${data[i].user.email}</div>
       <div class="payment-item col-2">${data[i].paymentid}</div>`;
       charityItems.appendChild(div); 
   }
 }




 //second buuton 
 async function charity_items(){
    let lastId=0
    const CharityJWT=localStorage.getItem('CharityJWT');
    let charitysData=JSON.parse(localStorage.getItem('charitysData'));
    if(charitysData!==undefined && charitysData!==null){
        lastId=charitysData[charitysData.length-1].id;
    }

    try{
        const data= await axios.get(`http://localhost:4000/charityAdmin/donationItemsData/${lastId}`,{
            headers:{
                'Authorization': `Bearer ${CharityJWT}`
            }
        })
        console.log(data)
        if(charitysData && charitysData!==null && data.data.length>0){
           let  UpdateCharitysData=[...charitysData,...data.data];
            localStorage.setItem('charitysData',JSON.stringify(UpdateCharitysData));
            displayCharitysItems()
        }else if(data.data.length>0){
            localStorage.setItem('charitysData',JSON.stringify(data.data));
            displayCharitysItems()
        }
        
    }catch(err){
        if(err.response.status==401){
            alert('plese login');
            window.location='../login/login.html'
        }
    }displayCharitysItems()

}

 function displayCharitysItems(){
    const data=JSON.parse(localStorage.getItem('charitysData'));
    let charity_items=document.getElementById('charityData');
    charity_items.innerHTML=``
    charity_items.className='row charity-admincharity-data'
    for (let i = 0; i < data.length; i++) {
       let Element = document.createElement('div');
       Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
       Element.innerHTML = `<div class="charity-item-container-dom">
       <h2 class="charity-item-heading-dom">${data[i].title}</h2>
       <img class="charity-item-img-dom" src="${data[i].img_url}">
       <p class="charity-item-discription">${data[i].discription}</p>
       <button class="payment-button" onclick="deleteCharityItem(${data[i].id})">Delete</button></div>`;
       charity_items.appendChild(Element);
    }
    
 }

async function deleteCharityItem(id){
    console.log(id);
   try{
    const datapost = await axios.delete(`http://localhost:4000/charityAdmin/donationItemDelete/${id}`);

    localStorage.removeItem('charitysData')
    window.location='./'

   }catch(err){
    console.log(err)
   }
  
} 
