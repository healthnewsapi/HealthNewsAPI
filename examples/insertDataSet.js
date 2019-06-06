const fs = require("fs");
const http = require("http");

// function request
const postNews = (news) => {
    const postData = JSON.stringify({
        news
      });
    const options = {
        hostname: "165.22.190.11",
        port: 8080,
        path: "/noticias",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on("end", () => {
            console.log("No more data in response.");
        });
    });

    req.on("error", (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}


let jsonData = JSON.parse(fs.readFileSync("retrieve.json", "utf-8"));

jsonData.map((news) => {
    postNews(news);
});
