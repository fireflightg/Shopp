firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        account.default();
        const tag =  document.getElementById('tag');
        const signin =  document.getElementById('signin');
        const signup =  document.getElementById('signup');
        const forgotpassoword =  document.getElementById('forgot');
        tag.innerText = "ready to go "+user.displayName;
        tag.style.display ="block";
        signin.style.display ="none";
        signup.style.display ="none";
        forgotpassoword.style.display ="none";
        signout.style.display ="block";
        console.log(user);
      
    } else {
      // No user is signed in.
    }
  });
        
var account = {
    default: function reset(){
        const username =  document.getElementById('name');
        const tag =  document.getElementById('tag');
        const signout =  document.getElementById('signout');
        const emailfield  =  document.getElementById('email');
       const passwordfield  =  document.getElementById('password');
       const confirmpasswordfield  =  document.getElementById('confirmpassword');
       const back = document.getElementById('Back');
       signout.style.display ="none";
        emailfield.style.display ="none";
       passwordfield.style.display ="none";   
        confirmpasswordfield.style.display ="none";
        back.style.display ="none";
        tag.style.display ="none";
        username.style.display ="none";
    },
    signupset: function signupset(){
        const username =  document.getElementById('name');
        const emailfield  =  document.getElementById('email');
       const passwordfield  =  document.getElementById('password');
       const confirmpasswordfield  =  document.getElementById('confirmpassword');
       const back = document.getElementById('Back');
        emailfield.style.display ="block";
       passwordfield.style.display ="block";   
        confirmpasswordfield.style.display ="block";
        back.style.display ="block"; 
        username.style.display ="block";     
    },
    signinset: function signinset(){
        const username =  document.getElementById('name');
        const emailfield  =  document.getElementById('email');
        const passwordfield  =  document.getElementById('password');
        const confirmpasswordfield  =  document.getElementById('confirmpassword');
        const back = document.getElementById('Back');
         emailfield.style.display ="block";
        passwordfield.style.display ="block";   
         confirmpasswordfield.style.display ="none";
         back.style.display ="block"; 
         username.style.display = "none";
    },
   signup: function CreateUserWithEmail() {
    const username =  document.getElementById('name');
    const emailfield  =  document.getElementById('email');
    const passwordfield  =  document.getElementById('password');
    const confirmpasswordfield  =  document.getElementById('confirmpassword');
    const back = document.getElementById('Back');
       if(emailfield.style.display == "none" || passwordfield.style.display == "none" || confirmpasswordfield.style.display == "none"){
           account.signupset();
       }
       var name = username.value;
       var email = emailfield.value;
       var password = passwordfield.value;
       var confirmpassword = confirmpasswordfield.value;
       if(confirmpassword == password){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
      
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(move){
            alert("Gets into .then");
            
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: name
          }); 
          var uidvalue = user.uid;
          console.log(uidvalue);
          console.log(uidvalue);
          
          alert("User value recorded");
          account.writesignup(email, username.value,uidvalue);
          
        });
    });  
       }
        else{
            alert("passwords do not match");
        }
       
    
   },
   signin: function signin(){
    const emailfield  =  document.getElementById('email');
    const passwordfield  =  document.getElementById('password');
    const confirmpasswordfield  =  document.getElementById('confirmpassword');
    const back = document.getElementById('Back');
       if(emailfield.style.display == "none" || passwordfield.style.display == "none" || confirmpasswordfield.style.display == "block"){
           account.signinset();
       }
       var email = emailfield.value;
       var password = passwordfield.value;
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {

       firebase.auth().signInWithEmailAndPassword(email, password).then(function(){alert("ready");
        firebase.database().ref().child("user/"+ firebase.auth.currentUser.uid).once('value', function(snapshot) {
            if (snapshot.hasChild("Stores")) {
              alert('exists');
              alert("loading");
            }
            else{
                alert("new player");

            }
          });
       });
    });
   },
   signout:function signout(){
    firebase.auth().signOut().then(function(){
       window.location ="index.html";
    });
   },
   writesignup: function writesignup(email, name, uuid){
    alert("Entered function");
    alert(name);
    var people =firebase.database().ref().child("users");
    people.child(uuid).set({
        "name": name,
        "email": email,
        "uid": uuid,
    }).then(function() {
        window.location ="Dash.html"
        alert("Completed");
    }).catch(function() {
        console.log(error.message);
        console.log(error.code);
    })  
   }   
}
