function addQuote(){
    var tr = document.createElement("tr"); 
    var td = document.createElement("td");
    var input = document.createElement("input");  
    input.type = "text";
    input.className = "quotes";
    var td2 = document.createElement("td");
    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Add";
    button.onclick = addQuote;
    
    var button2 = document.createElement("button");
    button2.type = "button";
    button2.innerHTML = "Remove";
    button2.onclick = function(){
        this.parentNode.parentNode.remove();
    }
    
    td2.appendChild(button);
    td2.appendChild(button2);
    
    td.appendChild(input);
    tr.appendChild(td);
    tr.appendChild(td2);
    document.getElementById("quote-list").appendChild(tr);
}

window.onload = function(){
    document.getElementById('addBtn').onclick = function(){
       addQuote();
    };
    
    document.getElementById('save').onclick = function(){
        var quote = document.getElementsByClassName("quotes");
        var quotes = [];
        for (i = 0; i < quote.length; i++) {
            var q = quote[i];
            if(q.value != ""){
                quotes.push(q.value);
            }
        }
        let setting = browser.storage.sync.set({quotes});

        // just check for errors
        setting.then(onSuccess, onError);
    }
    let quotes = browser.storage.sync.get();
    quotes.then(readOldQuote, onError);
}

function onError(error) {
    console.log(error);
  document.getElementById('message').innerHTML = "Error saving";
  clearMessage();
}

function onSuccess(){
    document.getElementById('message').innerHTML = "Saved succesfully";
    clearMessage();
}

function readOldQuote(data){
    if(data.quotes){
        for(var i=0;i< data.quotes.length;i++){
            if(i > 0){
                addQuote();
            }
            var quote = document.getElementsByClassName("quotes");
            quote[i].value = data.quotes[i];
        }
    }
}


function clearMessage(){
    setInterval(function(){
        document.getElementById('message').innerHTML = "";
        },3000);
}
