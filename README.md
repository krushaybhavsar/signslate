<p>🥇 Project received <b>1st place</b> in the Diversity and Inclusion Category of the High Tech Hacks 2021 Hackathon</p>
<p>🥇 Project received <b>1st place</b> overall in the Simplihacks 2021 Hackathon</p>
<p>🏆 Project received the <b>Wolfram Alpha Award</b></p>

Created by Krushay Bhavsar and Ayush Agarwal

## Demo and Explanatory Video
### https://www.youtube.com/watch?v=3E6PrQ1_dkQ
[![Demo and Explanatory Video](https://img.youtube.com/vi/3E6PrQ1_dkQ/0.jpg)](https://www.youtube.com/watch?v=3E6PrQ1_dkQ)

## Screenshots

![ss1](https://user-images.githubusercontent.com/68528325/122667266-f1a36080-d17f-11eb-8e42-728e516c3e23.png)
![ss2](https://user-images.githubusercontent.com/68528325/122667269-f36d2400-d17f-11eb-8bc7-2e4b36ab5c95.png)
![ss4](https://user-images.githubusercontent.com/68528325/122667275-fa943200-d17f-11eb-968a-52e24163167b.png)
![ss3](https://user-images.githubusercontent.com/68528325/122667270-f536e780-d17f-11eb-9af0-af1b798c48a4.png)
![ss5](https://user-images.githubusercontent.com/68528325/122667272-f9630500-d17f-11eb-934c-9b6d38330a94.png)

## Inspiration

American Sign Language (ASL) is a visual-gestural language created by those with speaking and hearing disabilities. The language has approximately 500,000 speakers around the world! Despite being able to communicate, ASL speakers struggle to feel included in society due to their differences. Not many people may understand how to communicate in the language. Due to this injustice, we were inspired to create a web application that not only educates the population on how to speak American Sign Language but also helps society become more inclusive. Rarely anyone who does not have a close friend or family member that has hearing/speaking disabilities knows or understands the language.

## What it does

Signslate is an application that allows users to speak and translate speech to ASL or allow users to sign in ASL through their webcam and translate it to speech. Through this application, non-ASL speakers can learn how to communicate in ASL while checking their ASL through the webcam component of the app. Moreover, with further development and improvement, this app can be used to close the communicational divide between blind and deaf people as well as non-ASL and ASL speakers.

## How we built it

To build this application, we used ReactJS and Python. Our frontend was built using ReactJS while the backend was hosted on a Flask server in Python. To translate speech to text, our application would send speech through an HTTP request to the Flask server which would perform web scraping to gather links to ASL videos corresponding to the words input. These links were sent back to React which then rendered the videos and played them one after each other. To translate the video from the webcam (in ASL) to speech, our application would send images through an HTTP request to the Flask server which would then combine the sequences of images to create a video. This video was then fed into a pre-trained video processing model to predict a word for the video. This predicted word was then sent back to React which translated text to audio.

## Challenges we ran into

Over the course of the hackathon, we ran into several issues, some much larger than others. The most time-consuming issue we had was in the English-to-ASL translator aspect of our project. We wanted to find a way to send the data the user inputs into a text area to a backend Flask server written in python. The text can then be processed and used for web-scraping. The challenging part about this is retrieving the processed data from the backend server into the ReactJS frontend in a way that would update the frontend in real-time as well. This challenge took us around 4 and a half hours to overcome. After tedious tweaking and code changes, we settled on a much simpler way to tackle the problem. Instead of updating the data on the frontend in real-time, we created a new URL route to display the videos. Every time the user would click the submit button, the page would redirect to another URL route. This forces the frontend to retrieve the updated data. Another challenge we ran into was finding accessible data for American Sign Language. Most translators or datasets only provide sign langue for singular letters. Sign language is not a compilation of singular letters and to make our project more practical, we aimed to only translate whole words or phrases. Eventually, we came across a useful ASL Dictionary site from which we decided to web-scrape videos. Challenges like these forced us to think in ways we never would have if it weren't for the hackathon. 

## Accomplishments that we're proud of

We are proud that we were able to learn how to web-scrape, as it was a great learning experience and interesting (fun too!). Although it was difficult at first to scrape through various websites, it was extremely satisfying to see it work smoothly. It was also amazing to be able to send an active video stream to our server. We're also proud that we were able to incorporate machine learning into our project by using video classification to translate a video into a word. 

## What we learned

We learned various topics related to web development and machine learning through this project. The project allowed us to learn complex topics in ReactJS and Python, as we had to connect a ReactJS frontend to a python backend Flask server. We also learned how to integrate machine learning models for practical applications and how to use speech recognition and text-to-speech to enhance our React applications. 

## What's next for Signslate

In the future, a few things we hope to improve for Signslate are its video classification accuracy and an extra feature to host video calls on Signslate which utilize both Speech-to-ASL and ASL-to-Speech components to enable communication between the blind and the deaf in addition to between non-ASL and ASL speakers.
