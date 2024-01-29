const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIASSRI3GXXZBHHUIWS",
    secretAccessKey: "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",
  },
});

async function getAWSBucketObject(key) {
  const command = new GetObjectCommand({
    Bucket: "afridi-test-private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

async function uploadFileToS3(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "afridi-test-private",
    Key: `uploads/videos/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });
  return url;
}

async function listAWSDirectory() {
  const command = new ListObjectsV2Command({
    Bucket: "afridi-test-private",
    Key: `/`,
  });

  const res = await s3Client.send(command);
  console.log("res", res);
}

async function deleteAWSFile() {
  const command = new DeleteObjectCommand({
    Bucket: "afridi-test-private",
    Key: `uploads/videos/image-1706550375494.jpeg`,
  });

  const res = await s3Client.send(command);
  console.log("res", res);
}

// getAWSBucketObject("3d-model.png")
//   .then((res) => console.log("3d-model.png url", res))
//   .catch((err) => console.log("err", err));

async function callAWS() {
  //   console.log(
  //     "3d-model.png url",
  //     await getAWSBucketObject(`uploads/videos/image-1706550375494.jpeg`)
  //   );

  await deleteAWSFile();
  await listAWSDirectory();

  //   console.log(
  //     "Upload file url",
  //     await uploadFileToS3(`image-${Date.now()}.jpeg`, "image/jpeg")
  //   );
}

callAWS();
