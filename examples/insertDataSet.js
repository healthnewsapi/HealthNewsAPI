const fs = require("fs");
const http = require("http");

// function request
const postNews = (news) => {
    const postData = JSON.stringify(news);
    const options = {
        hostname: "127.0.0.1" || process.env.URL_SERVER_HEALTH_NEWS_API,
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
            console.log("Request end");
        });
    });

    req.on("error", (e) => {
        console.error(`Error: ${e.message}`);
    });

    req.write(postData);
    req.end();
}


let jsonData = JSON.parse(fs.readFileSync("dataSet.json", "utf-8"));

jsonData.map((news) => {
    postNews(news);
});
