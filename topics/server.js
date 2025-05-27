const http = require("node:http");

// data
const dataTodo = [
  { "id": 1, "todo": "eat" },
  { "id": 2, "todo": "sleep" },
  { "id": 3, "todo": "pup" }
];

const dataUser = [
  { "id": 1, "name": "addu" },
  { "id": 2, "name": "muku" },
  { "id": 3, "name": "jadu" }
];


// server function
const serverFn = (req, res) => {

    //when server gets request after api is hit, it send msg in treminal
    console.log("Request received !");

//GET => server sends data when client asks for data
//POST => client sends data to server for storaging data

    //different urls
    if(req.url == "/todo"){

        // to set code and write header for content type
        res.writeHead(200, {
        "content-type": "application/json"
        })

        // using GET or POST method
        if(req.method == "GET"){
            //server response in browser
            res.end("Hello Aditya, from server!! \n url hit - " + req.url + "\nData : \n" + JSON.stringify(dataTodo));
        }
        else if(req.method == "POST"){
            //server response in browser
            res.end("Hello Aditya, from server!! \n url hit - " + req.url + "\nData : POST");
        }
    }
    else if(req.url == "/user"){

        // to set code and write header for content type
        res.writeHead(200, {
        "content-type": "application/json"
        })

        // using GET or POST method
        if(req.method == "GET"){
            //server response in browser
            res.end("Hello Aditya, from server!! \n url hit - " + req.url + "\nData : \n" + JSON.stringify(dataUser));
        }
        else if(req.method == "POST"){
            //server response in browser
            res.end("Hello Aditya, from server!! \n url hit - " + req.url + "\nData : POST");
        }
    }
    else {

        // to set code and write header for content type
        res.writeHead(404, {
        "content-type": "application/json"
        })

        //server response in browser
        res.end("Hello Aditya, from server!! \n url hit - " + req.url + "\nData : \n" + JSON.stringify({ result: [] }));
    }
    
};


// creating server
const server = http.createServer(serverFn);

// declaring POST address
const port = 6969;

//running server
server.listen(port, () => console.log("server is running..."));