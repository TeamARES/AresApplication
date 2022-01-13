from flask import Flask, send_file, request
import argparse
import datetime
import time
import cv2
import time
from science_module import science_algo
app = Flask(__name__)

camera_spectro = 0
camera_micro = 0

@app.route("/science")
def science():
    science = science_algo.ScienceModule()
    task = request.args.get("task")
    print("here")
    if task=="soil":
        return science.classifySoil()
    elif task=="mineral":
        return science.classifyMineral()
	#return "Started Science module!"

# start the flask app
if __name__=='__main__':
    app.run(port=5000, debug = True,use_reloader=False)
