async function userLogin(event){
    event.preventDefault();
    data={
        email:event.target.email.value,
        password:event.target.password.value
    }
    console.log(data)
    try{
        const dataPost= await axios.post('http://localhost:4000/admin/login',data);
        event.target.reset();
        if(dataPost.status==200){
            localStorage.setItem('AdminJWT',dataPost.data);
            window.location='../home/home.html'
        }else if(dataPost.status==203){
            alert('password Wrong')
        }
        console.log('okk')
    }catch(err){
       alert('err');  
    }
}