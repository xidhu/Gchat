function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let c = document.cookie.split("=");
    return c[1];
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setProfile(user){

    let user_data ={
             name:   user.displayName,
             uid :   user.uid,
             email:     user.email,
             photo:   user.photoURL,
    };
    setCookie("chat_user",JSON.stringify(user_data),365);
}

function getProfile(){

    return JSON.parse(getCookie("chat_user"));
}

function clearProfile(){
    eraseCookie("chat_user");
}

export {setProfile,getProfile,clearProfile};