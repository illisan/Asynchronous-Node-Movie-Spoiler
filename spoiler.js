
const readlineSync = require('readline-sync')         //allows user input
const request = require('request');                  //web scrapper
const cheerio = require('cheerio');

//Game starts here-->

const movieChoice = readlineSync.question('Hello! Please pick a movie: ');  //declaring statement that will take-in movie name
const timer = readlineSync.question('Select number of seconds: ');         //will allow user to select number of seconds before spoiler


console.log(`Spoiler Alert! about to spoil the movie ${movieChoice} in ${timer} seconds`) 
setTimeout(() => { getSpoiler() }, timer * 1000)   //



console.log(`The top search results for ${movieChoice} are:`);
let url = `https://www.google.ca/search?q=${movieChoice}`; //assigning a the target url a varibale to work with in request function.

request(url, function (err, response, body) {    //running requst function with corresponding call back function.
    if (!err) {
        $ = cheerio.load(body);            //$ is a shortcut appended to cheerio, this asks cheerio to load all the body it finds in the url.
        headlines = $(".r")                   // .r is the class of the h3 elements, the headlines that we want to scrape.
        headlines.each(function (i, elm) {    //this each function assigns an index to all elements in the array 
            console.log($(this).text());      //this line of code ensures that only text inside that element is printed out.
        })
    }
})

function getSpoiler() {
    request( // requesting API function

        `https://api.themoviedb.org/3/search/movie?api_key=26fb7d13bb698c6d1cb88159e0657142&query=${movieChoice}`, //API link
        function (err, response, body) {  
            let obj = JSON.parse(body)
            let movieInfo = obj.results[0].overview; //movieInfo represent the final result for this function.
            console.log(`SPOILER FOR ${movieChoice} is:`)
            console.log(movieInfo)
            

        })
}






