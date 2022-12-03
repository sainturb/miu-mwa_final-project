const AWS = require('aws-sdk');

module.exports.upload = function (req, res, next) {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ID,
        secretAccessKey: process.env.AWS_S3_SECRET
    });

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.file.originalname, // File name you want to save as in S3
        Body: req.file.buffer,
        ContentType: req.file.ContentType
    };

    s3.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({error:"Error -> " + err});
        }
        res.json({message: 'File uploaded successfully','filename':
            req.file.originalname, 'location': data.Location});
    });
}