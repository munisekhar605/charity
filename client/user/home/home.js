
function deleteJwt() {
   localStorage.removeItem('JWT');
   window.location = '../login/login.html';
}

window.onload=async ()=>{
   let datat= localStorage.getItem('JWT');
   if (datat) {
       let me = document.getElementById('navbar');
       let tm = document.createElement('button');
       tm.className = 'link-Item br';
       tm.onclick = deleteJwt; 
       tm.innerText = 'Logout';

       me.appendChild(tm);
   }else{
       window.location = '../login/login.html'; 
   }



   let limit=0;
   const token=localStorage.getItem('JWT');
   let charityItemsForUser=JSON.parse(localStorage.getItem('charityItemsForUser'));

   if(charityItemsForUser || charityItemsForUser!==null){
      limit=charityItemsForUser[charityItemsForUser.length-1].id;
   }
   try{
      const data=await axios.get(`http://localhost:4000/user/donationItemsData/${limit}`,{
         headers:{
            'Authorization':`Bearer ${token}`
         }
      });
      console.log(data)
      if(charityItemsForUser || charityItemsForUser!==null){
         let updateUserData=[...charityItemsForUser, ...data.data];
         localStorage.setItem('charityItemsForUser',JSON.stringify(updateUserData));
      }else if(data.data.length>0){
         localStorage.setItem('charityItemsForUser',JSON.stringify(data.data));
      }
      desplayitems()   
   }catch(err){
      console.log(err)
   }
}

 let desplayitems=()=>{
   const items=JSON.parse(localStorage.getItem("charityItemsForUser"))
   const filteredFood = items.filter(item => item.category =="food");
   const filteredMoney = items.filter(item => item.category =="money");
   const filteredEducation = items.filter(item => item.category =="education");
   const filteredHealth = items.filter(item => item.category =="health");

   let charity_items = document.getElementById('charity-items-container');
   charity_items.innerHTML = '<h1 class="charity-item-heading-dom">Food donation</h1>';

   for (let i = 0; i < filteredFood.length; i++) {
      let Element = document.createElement('div');
      Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
      Element.innerHTML = `<div class="charity-item-container-dom"><h4 class="charity-item-heading2-dom">Charity Name: ${filteredFood[i].charityAdmin.charityName}</h4><h2 class="charity-item-heading-dom">${filteredFood[i].title}</h2><img class="charity-item-img-dom" src="${filteredFood[i].img_url}"><p class="charity-item-discription">${filteredFood[i].discription}</p> 
      <button class="payment-button" onclick="paymentc(${filteredFood[i].charityAdminId}, ${filteredFood[i].id})">Pay Now</button>

      </div>`;
      charity_items.appendChild(Element);
   }
    

   var telement=document.createElement('h1');
   telement.className='charity-item-heading-dom'
   telement.innerText='Money Donation';
   charity_items.appendChild(telement)
   for (let i = 0; i < filteredMoney.length; i++) {
      let Element = document.createElement('div');
      Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
      Element.innerHTML = `<div class="charity-item-container-dom"><h4 class="charity-item-heading2-dom">Charity Name: ${filteredMoney[i].charityAdmin.charityName}</h4><h2 class="charity-item-heading-dom">${filteredMoney[i].title}</h2><img class="charity-item-img-dom" src="${filteredMoney[i].img_url}"><p class="charity-item-discription">${filteredMoney[i].discription}</p> <button class="payment-button" onclick="paymentc(${filteredMoney[i].charityAdminId}, ${filteredMoney[i].id})">Pay Now</button></div>`;
      charity_items.appendChild(Element);
   }

   var telement=document.createElement('h1');
   telement.className='charity-item-heading-dom'
   telement.innerText='Education Donation';
   charity_items.appendChild(telement)
   for (let i = 0; i < filteredEducation.length; i++) {
      let Element = document.createElement('div');
      Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
      Element.innerHTML = `<div class="charity-item-container-dom"><h4 class="charity-item-heading2-dom">Charity Name: ${filteredEducation[i].charityAdmin.charityName}</h4><h2 class="charity-item-heading-dom">${filteredEducation[i].title}</h2><img class="charity-item-img-dom" src="${filteredEducation[i].img_url}"><p class="charity-item-discription">${filteredEducation[i].discription}</p> <button class="payment-button" onclick="paymentc(${filteredEducation[i].charityAdminId}, ${filteredEducation[i].id})">Pay Now</button></div>`;
      charity_items.appendChild(Element);
   }

   var telement=document.createElement('h1');
   telement.className='charity-item-heading-dom'
   telement.innerText='Helth Donation';
   charity_items.appendChild(telement)
   for (let i = 0; i < filteredHealth.length; i++) {
      let Element = document.createElement('div');
      Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
      Element.innerHTML = `<div class="charity-item-container-dom"><h4 class="charity-item-heading2-dom">Charity Name: ${filteredHealth[i].charityAdmin.charityName}</h4><h2 class="charity-item-heading-dom">${filteredHealth[i].title}</h2><img class="charity-item-img-dom" src="${filteredHealth[i].img_url}"><p class="charity-item-discription">${filteredHealth[i].discription}</p>
      <button class="payment-button" onclick="paymentc(${filteredHealth[i].charityAdminId}, ${filteredHealth[i].id})">Pay Now</button></div>`;
      charity_items.appendChild(Element);
   }
}

async function allPayments() {
   const token = localStorage.getItem('JWT');
   try {
      const dataPost = await axios.get(`http://localhost:4000/user/allpayments`, {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      });
      console.log(dataPost.data)
      displayPayments(dataPost.data);
      // console.log(dataPost);
   } catch (err) {
      // if(err.response.status==401){
      //    window.location='../login/login.html'
      // }
      console.log(err);
   }}
function displayPayments(data) {
   let t=document.getElementById('userprofile');
   t.innerHTML=``;
   t.style.backgroundColor='transparent'
   t.style.border='none'
   let charityItems = document.getElementById('Payments-container');
   charityItems.className='payment-container'
   charityItems.innerHTML = `<h1 class="charity-heading-dom">Your Payments</h1>
   <div class="flex row"><div class="col-1 payment-heding">Amount</div>
   <div class="col-1 payment-heding">Status</div>
    <div class="payment-heding col-2">CharityName</div>
    <div class="payment-heding col-2">item title</div>
   <div class="payment-heding col-1">product id</div>
   <div class="payment-heding col-2">charityAdminId</div>
   <div class="payment-heding col-3">paymentid</div></div>
   `
   console.log(data,'jj')
   for (let i = 0; i < data.length; i++) {
       let div = document.createElement('div');
      //  div.className = 'flex row'; 
       div.innerHTML = `<div class="flex row">
       <div class="col-1 payment-item">${data[i].amount}</div>
       <div class="payment-item col-1">${data[i].payment_status}</div>
       <div class="payment-item col-2">${data[i].charityAdmin.charityName}</div>
       <div class="payment-item col-2">${data[i].donation_item.title}</div>
       <div class="payment-item col-1">${data[i].donationItemId}</div>
       <div class="payment-item col-2">${data[i].charityAdminId}</div>
       <div class="payment-item col-3">${data[i].paymentid}</div>
       </div>`;
       charityItems.appendChild(div); 
       console.log(charityItems)
   }
}
const paymentc=async(charityAdminId, foodId)=>{
   console.log(`Charity Admin ID: ${charityAdminId}, Food ID: ${foodId}`);
   const data={
      charityAdminId: charityAdminId,
      donationItemId: foodId
   }
   console.log(data)
   const token=localStorage.getItem('JWT');
   try{
      const dataPost=await axios.post(`http://localhost:4000/user/paymentCreate`,data,{
         headers:{
            'Authorization':`Bearer ${token}`
         }
      });
      alert('payment success')
   }catch(err){
      console.log(err)
   }
}


//navbar serching
const search=document.getElementById('Searchinput');
const button=document.getElementById('Searchbutton');

button.addEventListener('click', async function (){
   const data={
      data:search.value
   }
   const token = localStorage.getItem('JWT');
   try {
      const dataPost = await axios.post(`http://localhost:4000/user/search`,data, {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      });
      displaySearchData(dataPost.data)
   }catch(err){
      if(err.response.status==401){
          window.location='../login/login.html'
      }
      console.log(err)
   }
})


function displaySearchData(data){
   let t=document.getElementById('userprofile');
   t.innerHTML=``;
   t.style.backgroundColor='transparent'
   t.style.border='none'
   let charity_items = document.getElementById('Payments-container');
   charity_items.innerHTML='';
   charity_items.style.backgroundColor = 'transparent';
   charity_items.style.border = 'none';
   charity_items.className='row'
   // charity_items.innerHTML = '<h1 class="charity-item-heading-dom">Food donation</h1>';
  console.log(charity_items)
   for(let i=0;i<data.length;i++){
     
     
      for(j=i;j<data[i].donation_items.length;j++){ 
         console.log(data[j].donation_items)
         // let tm=document.createElement('div')
         // tm.className='Charity-name-container';
         // console.log(data[j].donation_items.title)
          
            let Element = document.createElement('div');
            Element.className = 'col-lg-2 col-md-3 col-sm-4 col-xs-6';
            Element.innerHTML = `<div class="charity-item-container-dom"><h4 class="charity-item-heading2-dom">Charity Name: ${data[i].charityName}</h4><h2 class="charity-item-heading-dom">${data[i].donation_items[j].title}</h2><img class="charity-item-img-dom" src="${data[i].donation_items[j].img_url}"><p class="charity-item-discription">${data[i].donation_items[j].discription}</p> 
            <button class="payment-button" onclick="paymentc(${data[i].donation_items[j].charityAdminId}, ${data[i].donation_items[j].id})">Pay Now</button>
            </div>`;
            charity_items.appendChild(Element)
         }

      }

   
}


async function userprofile(){
   let Element=document.getElementById('userprofile');
   let t=document.getElementById('Payments-container');
   t.innerHTML=``;
   t.style.backgroundColor='transparent'
   t.style.border='none'
   const jwt=localStorage.getItem('JWT');


      const getuserdata=await axios.get('http://localhost:4000/user/getuserdata',{
         headers:{
            'Authorization':`Bearer ${jwt}`
         }
      });
      console.log(getuserdata)
 
   Element.innerHTML=`
             <div class="col-8 form-container">
        <form class="form-item" onsubmit="updateUser(event)">
            <label class="input-lable" >Name</label><br>
            <input class="input-item" name="name" type="text" value="${getuserdata.data.name}" ><br>
            <label class="input-lable" >Email</label><br>
            <input class="input-item" name="email" type="email" value="${getuserdata.data.email}" ><br>
             <input class="input-item" name="id" type="text" hidden value="${getuserdata.data.id}" ><br>
            <button class="button-item" type="submit">update</button>
        </form>
   </div>`
}



async function updateUser (event){
   event.preventDefault()
   const token = localStorage.getItem('JWT');
   const data={
      name:event.target.name.value,
      email:event.target.email.value,
      id:event.target.id.value
   }
try{
   const postData=await axios.put('http://localhost:4000/user/updateuser',data,{
      headers:{
         'Authorization':`Bearer ${token}`
      }
   });
   alert('update success')
}catch(err){
   console.log(err)
}

}


















// document.querySelectorAll('.PaymentButton').forEach(button => {
//    button.addEventListener('click', async (e) => {
//       const itemId = e.target.getAttribute('data-item-id');
//       const CharityJWT = localStorage.getItem('CharityJWT');

//       try {
//          const { data } = await axios.get('http://localhost:4000/user/paymetncreate', {
//             headers: {
//                'Authorization': `Bearer ${CharityJWT}`
//             }
//          });

//          const { orderId } = data;
//          const options = {
//             "key": "rzp_test_P9yDvw31QolihZ",
//             "order_id": orderId,
//             "handler": async function (response) {
//                try {
//                   await axios.post('http://localhost:4000/charityAdmin/paymetsuccess', {
//                      orderId: orderId,
//                      paymentId: response.razorpay_payment_id
//                   }, {
//                      headers: {
//                         'Authorization': `Bearer ${CharityJWT}`
//                      }
//                   });
//                   alert('Success');
//                } catch (err) {
//                   alert('Something went wrong');
//                }
//             }
//          };

//          const rzp1 = new Razorpay(options);
//          rzp1.open();

//       } catch (err) {
//          console.log("err", err);
//       }
//    });
// });





// var options = {
//     "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
//     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//     "currency": "INR",
//     "name": "Acme Corp", //your business name
//     "description": "Test Transaction",
//     "image": "https://example.com/your_logo",
//     "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//     "handler": function (response){
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature)
//     },
//     "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
//         "name": "Gaurav Kumar", //your customer's name
//         "email": "gaurav.kumar@example.com", 
//         "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
// };
// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });
// document.getElementById('rzp-button1').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }
