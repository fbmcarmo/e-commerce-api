const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, file, cb){
            const fileName = `products/${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: function(req, file, cb){
        if(file.mimetype.startsWith("image/")){
            cb(null, true)
        } else {
            cb(new Error("Apenas imagens são permitidas"))
        }
    }
})

module.exports = {
    upload,
    s3Client
}