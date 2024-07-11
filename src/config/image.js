const multer = require('multer');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const storage = multer.memoryStorage(); // 메모리에 파일을 저장

const upload = multer({ storage: storage });

async function getImage(imageName) {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName
        };

        const command = new GetObjectCommand(params);
        const response = await s3.send(command);

        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        return buffer;
    } catch (err) {
        console.log('Get Image Error:', err);
        throw err;
    }
}

module.exports = {
    s3,
    storage,
    upload,
    getImage
};