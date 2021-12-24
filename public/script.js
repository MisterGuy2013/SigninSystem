function send(){
$.ajax({

    'url' : '/signup',
    'type' : 'POST',
    'data' : {
        'username' : 10
    },
    'success' : function(data) {              
        alert('Data: '+data);

    }
});}