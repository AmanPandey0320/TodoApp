var user;
var desc_u,title_u,time_u;
class ListView extends React.Component{
    render(){
        return(
            <ol>
                {this.props.data.map(e=>{
                    function deleteClickHandler(){
                        var data ={
                            id:user,
                            time:e.time,
                        };
                        var sender = JSON.stringify(data);
                        var xhr = new XMLHttpRequest();
                        xhr.open('DELETE','https://guarded-ridge-68240.herokuapp.com/todo/delete',true);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.onreadystatechange = function(){
                            if(this.readyState == 4){
                                if(this.status == 200){
                                    domSetter(user);
                                }
                            }
                        }
                        xhr.send(sender);
                    };
                    function updateClickHandler(){
                       desc_u=$('#description_u').val();
                       title_u=$('#title_u').val();
                       time_u = e.time;
                    };
                    
                    return(
                        <li>
                            <p>Title: {e.title}</p>
                            <p>Description: {e.description}</p>
                            <button onClick={deleteClickHandler} className="btn mr-1 btn-danger">Delete</button>
                            <button onClick={updateClickHandler}data-toggle="modal" data-target="#modelId2" className="btn ml-1 btn-primary">Update</button>
                            <hr></hr>
                        </li>
                    );
                })}
            </ol>
        );
    };
}



var setList = (data)=>{
    console.log('setlist');
    ReactDOM.render(<ListView data={data} />,document.getElementById('my-todo-listview'));
}

var domSetter =(userName)=>{
    console.log('domset');
    $.ajax({
        url:`https://guarded-ridge-68240.herokuapp.com/todo/tasks?username=${userName}`,
        type: 'GET',
        success: (responce)=>{
            setList(responce);
        }
    });
}

//sign in
$('#getUser').on('click',()=>{
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
        username:username,
        password:password,
    };
    var sender = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://guarded-ridge-68240.herokuapp.com/user/signin',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange= function() {
        if(this.readyState == 4){
            if(this.status == 200){
                console.log("logged in");
                user = username;
                domSetter(user);
            }else if(this.status == 401){
                console.log("401");
            }else if(this.stastatus == 404){
                console.log('404');
            }
        }
    }
    xhr.send(sender);
});

//signup
$('#newUser').on('click',()=>{
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
        username:username,
        password:password,
    };
    var sender = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://guarded-ridge-68240.herokuapp.com/user/signup',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange= function() {
        if(this.readyState == 4){
            if(this.status == 200){
                console.log("logged in");
                user = username;
                domSetter(user);
            }else if(this.status == 401){
                console.log("401");
            }else if(this.stastatus == 404){
                console.log('404');
            }
        }
    }
    xhr.send(sender);
});

// add task
$('#addBtn').on('click',()=>{
    var title = $('#title').val();
    var description = $('#description').val();
    alert(title+' '+description);
    if(user == null){
        alert('sign in toh kero!');
    }else if(title.trim().lenght == 0 || description.trim().length==0){
        alert('thik se bharo!');
    }else{
        var time = Date.now();
        var data ={
            time:`${time}`,
            id:user,
            title:title,
            description:description
        };
        var sender = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('PUT','https://guarded-ridge-68240.herokuapp.com/todo/add',true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    console.log(this.responce);
                    domSetter(user);
                }
            }
        }
        xhr.send(sender);
    }
});

$('#updateBtn').on('click',()=>{
    var new_desc =  desc_u;
    var new_title = title_u;
    // console.log(new_title+new_desc+time_u);
    var data ={
        time:`${time_u}`,
        id:user,
        title:new_title,
        description:new_desc,
    };
    var sender = JSON.stringify(data);
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT','https://guarded-ridge-68240.herokuapp.com/todo/update',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(this.status == 200){
                domSetter(user);
            }
        }
    }
    xhr.send(sender);
});
