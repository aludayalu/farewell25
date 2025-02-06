import flask, litedb
from flask import Flask, request
from threading import Lock
import json, hashlib
import base64, s3
import keys

count=litedb.get_conn("count")
count_lock=Lock()

if count.get("count") in [False, None]:
    count.set("count", 0)

uploaded_images=litedb.get_conn("uploaded_images")

app=Flask(__name__)

@app.post("/upload_images")
def upload_images():
    
    images=json.loads(request.get_data())

    last_count=-1
    any_new_images_upload=False

    for x in images:
        image_hash=hashlib.sha256(x.encode()).hexdigest()
        image_count=uploaded_images.get(image_hash)
        if image_count in [False, None]:
            any_new_images_upload=True
            image_id=count.get("count")
            last_count=image_id
            uploaded_images.set(image_hash, image_id)
            count_lock.acquire()
            open("images/"+str(image_id), "wb").write(base64.b64decode(x.split(",", 1)[1].encode()))
            s3.file_uploader("images/"+str(image_id), str(image_id))
            count.set("count", count.get("count")+1)
            count_lock.release()
        elif any_new_images_upload==False:
            last_count=image_count

    response=Flask.response_class(str(last_count))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    return response

@app.get("/image_count")
def image_count():
    response=Flask.response_class(str(count.get("count")))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    return response

@app.get("/get_image")
def get_image():
    image_id=int(request.args["image"])
    response=Flask.response_class(open("images/"+str(image_id)).read())
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    return response

@app.get("/render_image")
def render_image():
    image_id=int(request.args["image"])
    response=Flask.response_class(base64.b64decode(open("images/"+str(image_id)).read().split(",", 1)[1].encode()), mimetype="image")
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    return response

@app.get("/delete_image")
def delete_image():
    if request.args["password"]==keys.PASSWORD:
        s3.file_deleter(request.args["id"])
        response=Flask.response_class("true")
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        return response

app.run(host="127.0.0.1", port=5000)