//const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const path = require('path');
const VALID_KEYS_PATH = path.resolve('.\\valid-keys.txt');
const fs = require('fs');
const shortid = require('shortid');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;

module.exports = function (req, res) {  
    const apiKey = shortid.generate();
    const fd = fs.openSync(VALID_KEYS_PATH, 'a');
    //fs.appendFileSync(fd, apiKey + LINE_ENDING, 'utf8');
    var stream = fs.createWriteStream(VALID_KEYS_PATH, { flags: 'a' });
    stream.write(apiKey + LINE_ENDING);
    stream.end();
    return res.status(201).send({ apiKey });
};

