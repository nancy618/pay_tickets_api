const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
  const { pathname, query: { paidStr } } = url.parse(req.url, true);
  console.log(url.parse(req.url, true))
  let content = ''
  const filename = './tickets.json'
  const encode = 'utf-8'
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  switch (pathname) {
    case '/api/getPaidTickets':
      content = fs.readFileSync(filename, encode);
      res.end(JSON.stringify({ data: content }));
      break;
    case '/api/setPaidTickets':
      content = fs.readFileSync(filename, encode);
      content += ','
      content += paidStr
      console.log(content)
      fs.writeFileSync(filename, content);
      res.end(JSON.stringify({ data: true }));
  }
}).listen(8888);