const fs = require('fs');
const path = require('path');

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
        throw new Error('invalid data');
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

    return path.join(destDir, filename);
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

module.exports = UploadService;
