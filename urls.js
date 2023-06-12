const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');


const filename = process.argv[2];

if (!filename) {
  console.error('Please provide a filename.');
  process.exit(1);
}

let urls;
try {
  urls = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
} catch (error) {
  console.error(`Couldn't read the file: ${filename}`);
  process.exit(1);
}


function downloadUrl(url) {
  const outputFilename = new URL(url).hostname;

  return new Promise((resolve, reject) => {
    const httpClient = url.startsWith('https') ? https : http;

    httpClient.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Couldn't download ${url}`);
        resolve();
        return;
      }

      let html = '';

      response.on('data', (chunk) => {
        html += chunk;
      });

      response.on('end', () => {
        fs.writeFile(outputFilename, html, 'utf-8', (error) => {
          if (error) {
            console.error(`Couldn't write to ${outputFilename}`);
          } else {
            console.log(`Wrote to ${outputFilename}`);
          }
          resolve();
        });
      });
    }).on('error', (error) => {
      console.error(`Couldn't download ${url}`);
      resolve();
    });
  });
}


async function processUrls() {
  for (const url of urls) {
    await downloadUrl(url);
  }
}

processUrls();
