const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

class UploadService {
  static async uploadFile({ entityId, entity }, file) {
    let destDir = '';
    let fullPath = process.env.STATIC_PATH;
    switch (file.type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        destDir = process.env.IMAGE_PATH;
        break;
      default:
        fs.unlinkSync(file.path);
        throw new Error('invalid file type');
    }

    destDir = path.join(destDir, entity);
    fullPath = path.join(fullPath, destDir);
    destDir = path.join(destDir, entityId.toString());
    fullPath = path.join(fullPath, entityId.toString());
    createPath(fullPath);

    let source = fs.createReadStream(file.path);
    let filename = `${entity}_${entityId}_${path
      .basename(file.path)
      .split('_')
      .pop()}`;
    if (fs.existsSync(path.join(fullPath, filename))) {
      filename = Date.now().toString() + filename;
    }
    let dest = fs.createWriteStream(path.join(fullPath, filename));

    source.pipe(dest);
    const res = await streamPromise(source);

    fs.unlinkSync(file.path);
    if (res === 'error') {
      throw new Error('image was not saved');
    }

    const resizedDestDir = path.join(destDir, '50q');
    const resizedPath = path.join(fullPath, '50q');
    createPath(resizedPath);
    if (file.size > 1024 * 200) {
      const format = 'jpg';
      const resizedFilename = filename.split('.')[0];
      runService({
        originalPath: path.join(fullPath, filename),
        resizedPath: path.join(resizedPath, resizedFilename),
        format,
      });

      return path.join(resizedDestDir, `${resizedFilename}.${format}`);
    } else {
      return path.join(destDir, filename);
    }
  }

  static removeFile(fileName) {
    const filePath = path.join(process.env.FRONT_PATH, fileName);
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      throw new Error('file was not deleted');
    }
    return true;
  }
}

function streamPromise(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve('end');
    });
    stream.on('finish', () => {
      resolve('finish');
    });
    stream.on('error', error => {
      reject(error);
    });
  });
}
function createPath(fullPath) {
  let paths = fullPath.split(path.sep).filter(i => i);
  fullPath = '/';
  paths.forEach(dirPath => {
    if (fullPath === '') {
      fullPath = dirPath;
    } else {
      fullPath = path.join(fullPath, dirPath);
    }

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  });
}

function runService({ originalPath, resizedPath, format }) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, '/../workers/ImageResizer.js'), {
      workerData: JSON.stringify({ originalPath, resizedPath, format }),
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
module.exports = UploadService;
