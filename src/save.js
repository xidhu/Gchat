function setProfile(result){

    let user = {
        isNewUser : result.additionalUserInfo.isNewUser,
        name : result.user.displayName,
        uid : result.user.uid,
        photoUrl : result.user.photoURL,
        isVerified : result.user.emailVerified,
    };
    setCookie("gchat_user",JSON.stringify(user),365);
}

function eraseProfile(){
    eraseCookie("gchat_user");
}

function getProfile(){

    let user = JSON.parse(getCookie("gchat_user"));
    return user;
}

function showCurrentUser(){

    alert(
        getProfile()
    );

}

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
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export {setProfile,getProfile,eraseProfile,showCurrentUser};