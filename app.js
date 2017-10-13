const jquery = require('jquery');
const Nightmare = require('nightmare'),
      nightmare = Nightmare();
const fs = require('fs');


//
// let city = process.argv[2]

nightmare.goto('https://www.apmex.com/category/10002/gold-and-silver-top-picks?page=1&sortBy=mostpopulardesc&f_metalname=silver')
    .wait(2000)
    .evaluate(function(){
      let coins = [];
      $('.product-item').each(function(){
        item = {}
        item["title"] = $(this).text()
        item["link"] = $(this).attr("href")
        coins.push(item)
      });
      return coins;
    })
    .end()
    .then(function(result){
      let stream = fs.createWriteStream("apmex.txt");
      stream.once('open', function(fd) {
        stream.write(result.coins+"\n");
        stream.end();
      });
      console.log(result);
    })
