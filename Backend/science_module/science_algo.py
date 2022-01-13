import os 
import tensorflow as tf
from tensorflow import keras
import json

class ScienceModule:
    def __init__(self):
        self.sand = 0
        self.silt = 0
        self.clay = 0
        self.finalSoilClassification = ""
        self.mineralIdentified =""
        self.mineralColor=""
        self.streak=""
        self.elements=[]
        self.loaded_model = self.load_model("science_module/sample_model.h5")
    def load_model(self,modelFile):
        return keras.models.load_model(modelFile)
    def classifySoil(self):
        (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.fashion_mnist.load_data()
        test_images = test_images[:100].astype('float32') / 255
        test_images = test_images.reshape((test_images.shape[0],  28, 28,1))
        out = self.loaded_model.predict(test_images)
        self.finalSoilClassification = "Red Soil" # abhi test values, should come from model
        self.sand = 10
        self.silt = 40
        self.clay = 50
        data = self.getSoilData()
        return json.dumps(data)
    def getSoilData(self):
        data = dict()
        data.update({"sand": self.sand})
        data.update({"silt": self.silt})
        data.update({"clay": self.clay})
        data.update({"class": self.finalSoilClassification})
        return data
    def classifyMineral(self):
        self.element=["Al","Fe","Xe"]
        self.streak="Black"
        self.mineralIdentified="Aluminium"
        self.mineralColour="Brown"
        return json.dumps(self.getMineralData())
    def getMineralData(self):
        data=dict()
        data.update({"elements": self.element})
        data.update({"streak": self.streak})
        data.update({"mineralIdentified": self.mineralIdentified})
        data.update({"mineralColour": self.mineralColour})
        return data


