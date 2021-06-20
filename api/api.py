from flask import Flask, request, json
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import base64
from PIL import Image
import cv2
import numpy as np
import io
import re
from eval import evaluate
from locateWord import find_word
import random

app = Flask(__name__)
CORS(app)

links = ""
words = ""
imgArray = []

def scrape_videos(websiteURL):
    html_text =  requests.get(websiteURL).text
    soup = BeautifulSoup(html_text, 'lxml')
    video_div_container = soup.find('div', {"itemtype":"http://schema.org/VideoObject"})
    try:
        video = video_div_container.select("#video_con_signasl_1")[0].find('source')
        videoLink = video['src']
    except:
        try:
            videoLink = video_div_container.select("iframe")[0].attrs['src'] + "&autoplay=1"
            videoLink = videoLink.replace("loop=1", "loop=0")
        except:
            videoLink = "unavailable"
    return str(videoLink)

def compile_videos(words):
    all_videos = []
    for word in words:
        all_videos.append(scrape_videos('https://www.signasl.org/sign/' + str(word)))
    return all_videos


@app.route('/api/getText', methods=['GET'])
def api():
    global words, links
    return{
        "link": links,
        "words": words
    }

def cleanText(word):
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    clean_word = ""
    for char in word:
        if char not in punctuations:
            clean_word = clean_word + char
    return clean_word

@app.route('/api/sendText', methods=['POST'])
def findVideos():
    global words, links
    request_data = json.loads(request.data)
    cleaned_words = list(map(cleanText, request_data['content'].lower().split()))
    # return {
    #     'link': compile_videos(cleaned_words),
    #     'words': cleaned_words
    # }

    links = compile_videos(cleaned_words)
    words = list(request_data['content'].split())

    return {
        'message': links,
        'words': words
    }

@app.route('/api/sendImage', methods=['POST'])
def getImageData():
    global imgArray
    request_data = json.loads(request.data)
    # print(request_data['image_data'])
    if (request_data['save'] == "True"):
        image_data = re.sub('^data:image/.+;base64,', '', request_data['image_data'])
        imgdata = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(imgdata))
        image = np.array(image)
        imgArray.append(image)
        return {
            'word': ""
        }
    else:
        # Run prediction script
        # imgArray = np.asarray(imgArray, dtype=np.uint8)
        # print(imgArray[-1])
        # print(np.append(imgArray, np.repeat(np.expand_dims(imgArray[-1], 0), (64 - len(imgArray)), axis=0), axis=0).shape)
        # imgArray = np.append(imgArray, np.repeat(np.expand_dims(imgArray[-1], 0), (64 - len(imgArray)), axis=0), axis=0)
        # print(imgArray.shape)
        # indices = np.sort(np.asarray(random.sample(range(0, len(imgArray)), 64), dtype=np.int32))
        # print(indices)
        # imgArray = imgArray[indices]
        # print(np.asarray(imgArray, dtype=np.float32).shape)
        # print(len(imgArray))
        
        # for count in range(len(imgArray)):
            # print(np.asarray(imgArray, dtype=np.uint8)[count])
            # cv2.imwrite("./imgs/image{}.jpg".format(count), imgArray[count]/255.0)
            # img = Image.fromarray(imgArray[count], 'RGB')
            # img.show()
            # break
            # cv2.imshow("image", imgArray[count])
            # cv2.waitKey()
            # im.save("./imgs/image{}.jpeg".format(count))

        prediction = evaluate(imgArray)
        word = find_word(prediction)
        imgArray = []

        return {
            'word': word
        }
    