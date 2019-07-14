var quotes = [];
    quotes.push("Couples who are more in love spend more time making eye contact than the others.");
    quotes.push("Some people automatically assume that you're mad at them when you're quiet. This is due to guilty conscious.");
    quotes.push("Listen carfully to how a person speaks about other people to you.<br/> This is most likely how they will speak about you to other people");
    quotes.push("Never say:<br/>That won't happen to me.<br/><br/>Life has a funny way of proving us wrong");
    quotes.push("Dear life, I have a complete grasp on the fact that you are not fair. so please stop teaching me that lesson.");
    quotes.push("The human attention span maxes out at about 10 minutes,<br/><br/>Over that and we will tend to revert to daydreaming.");
    quotes.push("Taking a long, warm bath or shower<br/><br/>can help fight feelings of loneliness.<br/><span>[thepsychmind.com]</span>");
    quotes.push("When somebody smells good,<br/> we automatically preceive them as more attractive. <br/><span>thepsychmind.com</span>");
    
    var quoteElement = document.getElementById('quote');
    var quoteColors = ['#000000','#e71313','#5045ff','#40e816'];
    
    
    function readOldQuote(data){
        if(data.quotes){
            quotes = [];
            for(var i=0;i< data.quotes.length;i++){
                quotes.push(data.quotes[i]);
            }
        }
        drawQuote();
    }

    window.onload = function(){
        let quotesSaved = browser.storage.sync.get();
        quotesSaved.then(readOldQuote, drawQuote);
    }
    
    function drawQuote(){
        var number = getRandomInt(0,quoteColors.length-1);
        
        document.body.style.background = "#FFFFFF";
       
        // for quotes
        var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        var topPosition = getRandomInt(10,height/2);
        var elementWidth = getRandomInt(200,600);
        var leftPosition = getRandomInt(10,(width-elementWidth-10));
        quoteElement.style.top = topPosition+"px";
        quoteElement.style.left = leftPosition+"px";
        quoteElement.style.width = elementWidth+"px";
        quoteElement.style.color = quoteColors[getNextNumber(number)];
        
        var quoteIndex = getRandomInt(0,quotes.length);
        quoteElement.innerHTML = escapeHTML(quotes[quoteIndex]);
        
        
    }
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function getNextNumber(number){
        var nextNumber = number;
        while(nextNumber == number){
            nextNumber = getRandomInt(0,quoteColors.length-1);
        }
        return nextNumber;
    }
    
    function escapeHTML(str) { return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]); }
    
    document.getElementById("config").onclick = function(){
        var createData = {
          type: "detached_panel",
          url: "options.html",
          width: 500,
          height: 300
        };
        var creating = browser.windows.create(createData);
    }
