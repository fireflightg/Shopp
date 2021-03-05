
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
        console.log(user);
        var title = document.getElementById("title");
        title.innerText = user.displayName + "'s Dashboard"
        var startingammount = document.getElementById("startingammount");
        var confirm = document.getElementById("confirm");
        var Ask = document.getElementById("Ask");
        var warning = document.getElementById("warning");
        firebase.database().ref().child("users/"+ user.uid).once('value', function(snapshot) {
            if (snapshot.hasChild("Stores")) {
              alert("continue");
              game.getsymbol();
            }
            else{
                alert("new player");
                
                startingammount.style.display ="block";
                confirm.style.display = "block";
        Ask.style.display = "block";
        warning.style.display = "block";

            }
          });
          
        
    } else {
      
    }
  });
  var game = {
      default: function(){
        var startingammount = document.getElementById("startingammount");
        var confirm = document.getElementById("confirm");
        var Ask = document.getElementById("Ask");
        var warning = document.getElementById("warning");
        startingammount.style.display ="none";
        confirm.style.display = "none";
        Ask.style.display = "none";
        warning.style.display = "none";
        
      },
      setup: function setup(){
          
        
      },
      newplayersetup: function(){
        var user = firebase.auth().currentUser;
        var startingammount = document.getElementById("startingammount");
        var confirm = document.getElementById("confirm");
        var Ask = document.getElementById("Ask");
        var warning = document.getElementById("warning");
        var stores =startingammount.value;
        firebase.database().ref().child("users/"+ user.uid).update({
            "startingammount": start,
            "Stores": start,
            
        });
      },
      getstores: function(){
        

      },
      liststores: function(){
     
      },
      showmap: function(){
     
      }
  }