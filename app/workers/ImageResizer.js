const { workerData, parentPort } = require('worker_threads');
const data = JSON.parse(workerData);
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
(async () => {
  sharp(data.originalPath)
    .resize(800, null)
    .toFormat(data.format, { quality: 50 })
    .toFile(`${data.resizedPath}.${data.format}`, err => {
      if (err) {
        parentPort.postMessage(false);
        fs.appendFileSync(
          path.join(__dirname, '../../../imageResizer.log'),
          err.stack + '\n' + err.message + '\n'
        );
      } else {
        parentPort.postMessage(true);
      }
    });
})();
