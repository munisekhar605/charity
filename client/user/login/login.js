async function userLogin(event){
    event.preventDefault();
    data={
        email:event.target.email.value,
        password:event.target.password.value
    }
    console.log(data)
    try{
        const dataPost= await axios.post('http://localhost:4000/user/login',data);
        event.target.reset();
        if(dataPost.status==200){
            localStorage.setItem('JWT',dataPost.data);
            window.location='../home/home.html'
        }else if(dataPost.status==203){
            alert('password Wrong')
        }
    }catch(err){
       alert('err');  
    }
}