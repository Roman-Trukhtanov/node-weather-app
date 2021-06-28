const http = require('http');

const StatusNumber = {
  SUCCESSFUL: 200,
  REDIRECT: 300,
};

const UrlPath = {
  CURRENT: `current`,
};

class API {
  constructor({ entryPoint, accessKey }) {
    this._entryPoint = entryPoint;
    this._accessKey = accessKey;
  }
  getCurrent(cityName = '') {
    return this._get(UrlPath.CURRENT, cityName);
  }
  _get(url, query) {
    return new Promise((resolve, reject) => {
      http
        .get(
          `${this._entryPoint}/${url}?access_key=${this._accessKey}&query=${query}`,
          (response) => {
            if (
              response.statusCode < StatusNumber.SUCCESSFUL ||
              response.statusCode >= StatusNumber.REDIRECT
            ) {
              // First reject
              reject(new Error('STATUS_CODE = ' + res.statusCode));
              return;
            }

            let data = '';
            response.on('data', (chunk) => (data += chunk));

            response.on('end', () => {
              resolve(JSON.parse(data));
            });
          }
        )
        .on('error', reject);
    });
  }
}

module.exports = API;
