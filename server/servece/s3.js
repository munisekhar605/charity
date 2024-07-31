const AWS=require('aws-sdk');
const uploadS3=(file)=>{
 return new Promise((rel,rej)=>{
    let s3buket=new AWS.S3({
        accessKeyId:process.env.ACCESSKEYID,
        secretAccessKey:process.env.SECRETACCESSKEY
    })
    
    let params={
        Bucket:process.env.BUCKET,
        Key:`images/${Date.now()}_${file.originalname}`,
        Body:file.buffer,
        contentType:file.mimetype,
        ACL:'public-read'
    }

    s3buket.upload(params,(err,res)=>{
        if(err){
            rej('err')
        }else{
            rel(res.Location)
        }
    })
 })
}
module.exports=uploadS3;