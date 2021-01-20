$.ajax({
    url:'/todo/tasks?username=Aman2020',
    type: 'GET',
    success: (responce)=>{
        console.log(responce);
    }
})