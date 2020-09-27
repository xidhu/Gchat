import {auth,db} from "./firebase";

async function signUpWithEmail(email,password,name){

        
        try{
            await auth.createUserWithEmailAndPassword(email, password).then(
                (res) =>{
                    res.user.updateProfile(
                        {
                            displayName : name,

                        }
                    );
                    sentVerification();
                    window.email = email;
                    
                    
                }
            ).catch(function(error) {
    
                alert(error);
    
          });
        }
        catch(e){
            alert("Error Occured...!Try Again Later");
        }
}


async function sentVerification(){
    try{
        await auth.currentUser.sendEmailVerification()
                .then(function () {
                    alert("Verification is sent on your Email...!");
                }).catch(function (error) {
                   
                });

    }
    catch(e){
        alert("Error Occured...!Try Again Later");
    }

    
                    
}

async function resetPassword(email){

    try{
        
        await auth.sendPasswordResetEmail(email)
        .then(() =>{
            alert("Password Reset Email Sent.");
        })
        .catch((error) => {
            alert(error);
        });
    }catch(e){
        alert("Error Occured...!Try Again Later");
    }
}
async function signInWithEmail(email,password){

    try{
        await auth.signInWithEmailAndPassword(email,password)
        .then((result) => {

           
            if(result.user.emailVerified){
                
                location.reload();
            }
            else{
                alert("Please Verify Your Email..!");
                location.reload();
            }
            
            
        }).catch(function(error) {

                location.reload();
                alert(error);
                
    
          });

    }
    catch(e){
        alert("Error Occured...!Try Again Later");
    }
}

async function signOut(){

    try{
        await auth.signOut()
            .then(function () {
               
                alert("Successfully Logged Out");
                location.reload();
            }).catch(function (error) {
                alert(error);
            });
    }
    catch(e){
        alert("Error Occured...!Try Again Later");
    }
}



export {signUpWithEmail,signInWithEmail,sentVerification,signOut,resetPassword};