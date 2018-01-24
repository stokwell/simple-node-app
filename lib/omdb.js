const http = require('http');

function get(title, done) {
  const req = http.get(`http://18.220.163.253:8080/movie_db/search?keyword=${title}`, res => {
    if (res.statusCode !== 200) {
      done(new Error(`Error: ${res.statusMessage} (${res.statusCode})`));
      res.resume();
      return;
    }

    res.setEncoding('utf-8');

    let body = '';

    res.on('data', data => body += data);

    res.on('end', () => {
      let result;

      try {
        result = JSON.parse(body);
      } catch(error) {
        done(error)
      }
      console.log(result.data)

      done(null, result.data)
    })

  })

  req.on('error', error => done(error));

}

module.exports = {
  get
}
