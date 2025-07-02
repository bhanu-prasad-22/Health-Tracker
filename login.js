document.getElementById("login-form")/addEventListener("submit",function(e){
    e.preventDefault();

    const username=document.getElementById("username").value.trim();
    const password=document.getElementById("password").value.trim();
    const errorbox=document.getElementById("error");

    //Basic fake login check
    if(username ==="user" && password==="1234"){
        localStorage.setItem("loggedIn","true");
        window.location.href="index.html"; //go to tracker page
    } else {
        errorbox.textContent ="Invalid username or password!";
    }

});