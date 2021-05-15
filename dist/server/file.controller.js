const fs = require("fs");
const baseUrl = "http://localhost:3000/files/rgbCUBE888";

const getListFiles = (req, res) => {
  const directoryPath = __dirname + "/../client/files/rgbCUBE888";
  console.log(directoryPath);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __dirname + "/../client/files/rgbCUBE888/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  getListFiles,
  download,
};