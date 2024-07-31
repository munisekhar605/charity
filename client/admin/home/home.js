window.onload = () => {
    let data = localStorage.getItem('AdminJWT');
    if (data) {
        let me = document.getElementById('navbar');
        let tm = document.createElement('button');
        tm.className = 'link-Item br';
        tm.onclick = deleteJwt; 
        tm.innerText = 'Logout';

        me.appendChild(tm);
    }else{
        window.location = '../login/login.html'; 
    }
};

function deleteJwt() {
    localStorage.removeItem('AdminJWT');
    window.location = '../login/login.html';
}


async function charitys(){
    const token=localStorage.getItem('AdminJWT');
    try{
        const data=await axios.get(`http://localhost:4000/admin/charitys`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        localStorage.setItem('adminCharityManeger',JSON.stringify(data.data))
        desplayCharitys(data.data);
    }catch(err){
        if(err.response.status==401){
            window.location='../login/login.html'
        }
    }
}

function desplayCharitys(data){
    let Element =document.getElementById('charity-items-container');
    Element.innerHTML=``
    let t=document.createElement('div')
    t.className='row dom-charity-container-name'
    t.innerHTML=`
        <div class=" col-3 dom-item-name" >charityName</div>
        <div class=" col-3 dom-item-name">emails</div>
        <div class=" col-2 dom-item-name">Status</div>
       <div class=" col-2 dom-item-name">update</div>`
        Element.appendChild(t)
    for(i=0;i<data.length;i++){
        let tEm=document.createElement('div');
        tEm.className='dom-charity-container row'
        tEm.innerHTML=`
        <div class=" col-3 dom-item" > ${data[i].charityName}</div>
        <div class=" col-3 dom-item"> ${data[i].email}</div>
        <div class=" col-2 dom-item"> ${data[i].status}</div>
        <button class=" col-2 dom-button" onclick="updatecharity(${i})">Edit</button>`;
        Element.appendChild(tEm)
    }
}

 function updatecharity(data){
    console.log(data);
    const charitydata=JSON.parse(localStorage.getItem('adminCharityManeger'));
    console.log(charitydata[data])
    let Element =document.getElementById('charity-items-container');
    Element.innerHTML=`
        <div class="col-8 form-container">
        <form class="form-item" onsubmit="sendupdateCharity(event)">
            <label class="input-lable" >Charity name</label><br>
            <input class="input-item" name="name" type="text" value="${charitydata[data].charityName}" ><br>
            <label class="input-lable" >Email</label><br>
            <input class="input-item" name="email" type="email" value="${charitydata[data].email}" ><br>
             <label class="input-lable" >status</label><br>
            <input class="input-item" name="status" type="text" value="${charitydata[data].status}" ><br>
             <input class="input-item" name="id" type="text" hidden value="${charitydata[data].id}" ><br>
            <button class="button-item" type="submit">update</button>
        </form>
    `   
 }
 async function sendupdateCharity(event){
    event.preventDefault();
    const token=localStorage.getItem('AdminJWT');
    const data={
        name:event.target.name.value,
        email:event.target.email.value,
        status:event.target.status.value,
        id:event.target.id.value
    }
    console.log(data,'ok')
    try{
        const dataPost=await axios.post(`http://localhost:4000/admin/updatecharity`,data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        charitys()
    }catch(err){
        if(err.response.status==401){
            window.location='../login/login.html'
        }
        console.log(err)
    }
 }



 async function payment(){
    const token=localStorage.getItem('AdminJWT');
    try{
        const data=await axios.get(`http://localhost:4000/admin/payment`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        desplayCharitys(data.data);
    }catch(err){
        if(err.response.status==401){
            window.location='../login/login.html'
        }
    }
 }




async function allPayments() {
    const token = localStorage.getItem('AdminJWT');
    try {
       const dataPost = await axios.get(`http://localhost:4000/admin/allpayments`, {
          headers: {
             'Authorization': `Bearer ${token}`
          }
       });
       displayPayments(dataPost.data);
       console.log(dataPost);
    } catch (err) {
       console.log(err);
    }
 }
 
 function displayPayments(data) {
    let charityItems = document.getElementById('charity-items-container');
   charityItems.className='payment-container'
   charityItems.innerHTML = `<h1 class="charity-heading-dom">Your Payments</h1>
   <div class="flex row"><div class="col-1 payment-heding">Amount</div>
   <div class="col-1 payment-heding">Status</div>
   <div class="payment-heding col-1">product id</div>
   <div class="payment-heding col-1">charityAdminId</div>
   <div class="payment-heding col-2">Charity mail</div>
    <div class="payment-heding col-2">user mail</div>
   <div class="payment-heding col-3">paymentid</div></div>
   `
   for (let i = 0; i < data.length; i++) {
       let div = document.createElement('div');
       div.className = 'flex row'; 
       div.innerHTML = `<div class="col-1 payment-item">${data[i].amount}</div>
       <div class="payment-item col-1">${data[i].payment_status}</div>
       <div class="payment-item col-1">${data[i].donationItemId}</div>
       <div class="payment-item col-1">${data[i].charityAdminId}</div>
       <div class="payment-item col-2">${data[i].charityAdmin.email}</div>
       <div class="payment-item col-2">${data[i].user.email}</div>
       <div class="payment-item col-3">${data[i].paymentid}</div>`;
       charityItems.appendChild(div); 
   }
 }
 
 