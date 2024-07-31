async function userSignup(event){
    event.preventDefault();
    data={
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    try{
        const dataPost= await axios.post('http://localhost:4000/charityAdmin/signup',data);
        event.target.reset()
        window.location='../login/login.html'
    }catch(err){
       alert('err');  
    }
} 