import boto3, keys

ACCESS_KEY = keys.ACCESS_KEY
SECRET = keys.SECRET
BUCKET_NAME = "dpsfarewell"

def file_uploader(path, name):
    s3 = boto3.client("s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET)
    s3.upload_file(path, BUCKET_NAME, name)
    return True

def file_deleter(name):

    s3 = boto3.client("s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET)
    s3.delete_object(Bucket=BUCKET_NAME, Key=name)
    return True