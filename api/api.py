from flask import Flask, request, json
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import base64
from PIL import Image
import numpy as np
import io
import re
from eval import evaluate
from locateWord import find_word
import os

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
        prediction = evaluate(imgArray)
        word = find_word(prediction)
        imgArray = []
        return {
            'word': word
        }