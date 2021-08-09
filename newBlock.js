const fs = require("fs");

const projectConfig = require("./config.js");

const dir = projectConfig.dir;
const mkdirp = require("mkdirp");

const blockName = process.argv[2];
const defaultExtensions = [
  "scss",
  "html",
  //'bg-img'
]; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока

if (blockName) {
  //const dirPath = `${dir.blocks}${blockName}/`; // полный путь к создаваемой папке блока

  const partialPath = `./src/templates/partials/`;
  const stylePath = `./src/sass/blocks/`;

  // const made = mkdirp.sync(partialPath);
  // console.log(`[NTH] Создание папки: ${made}`);

  // Обходим массив расширений и создаем файлы, если они еще не созданы
  extensions.forEach((extension) => {
    let filePath = `${partialPath + blockName}.${extension}`; // полный путь к создаваемому файлу
    let fileContent = ""; // будущий контент файла
    let fileCreateMsg = ""; // будущее сообщение в консоли при создании файла

    if (extension === "scss") {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n\n  $block-name:                &; // #{$block-name}__element\n}\n`;
      filePath = `${stylePath + blockName}.${extension}`;
      // fileCreateMsg = '';
    } else if (extension === "html") {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n\n  $block-name:                &; // #{$block-name}__element\n}\n`;
      //filePath = `${stylePath + blockName}.${extension}`;
      // fileCreateMsg = '';
    }

    if (
      fileExist(filePath) === false &&
      extension !== "img" &&
      extension !== "bg-img" &&
      extension !== "md"
    ) {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`[NTH] Файл НЕ создан: ${err}`);
        }
        console.log(`[NTH] Файл создан: ${filePath}`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    } else if (
      extension !== "img" &&
      extension !== "bg-img" &&
      extension !== "md"
    ) {
      console.log(`[NTH] Файл НЕ создан: ${filePath} (уже существует)`);
    }
    // else if (extension === "md") {
    //   fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
    //     if (err) {
    //       return console.log(`[NTH] Файл НЕ создан: ${err}`);
    //     }
    //     console.log(`[NTH] Файл создан: ${dirPath}readme.md`);
    //     if (fileCreateMsg) {
    //       console.warn(fileCreateMsg);
    //     }
    //   });
    // }
  });
} else {
  console.log("[NTH] Отмена операции: не указан блок");
}

function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  const fs = require("fs");
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === "ENOENT");
  }
}
