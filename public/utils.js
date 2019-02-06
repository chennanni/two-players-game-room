// dummmy login function
// TODO: move to server side
function login(){
    var name = $('#player_name').val();
    //alert(name);
    if (name == "alice" || name == "bob") {
      var url = window.location + name;
      //alert(url);
      window.location = url;
    } else {
      alert("user not registered!");
    }
}

// stop "Enter" event so that page will not re-direct with error
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);
