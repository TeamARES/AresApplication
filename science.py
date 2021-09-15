from pynput import keyboard
import socket
import argparse
import requests
from socketengine import client
import requests
from flask import Flask, request, Response

Server = 'http://192.168.29.139:8001/science'

class Science:
    def __init__(self, is_server_running):
        self.speeds = dict()
        self.speeds.update({1 : 1})
        self.speeds.update({2 : 1})
        self.speeds.update({3 : 1})
        self.speeds.update({4 : 1})
        self.speeds.update({5 : 1})
        self.speeds.update({6 : 1})
        self.speeds.update({7 : 1})
        self.speeds.update({8 : 1})
        self.numkey = ""
        self.img_no_spectro = 0
        self.img_no_micro = 0
        self.add_capture_spectro = "http://192.168.29.3:8000/capture_spectro"
        self.add_capture_micro = "http://192.168.29.3:8000/capture_micro"
        self.active = False
        self.c = client(addr = "127.0.0.1", port = 8002)
        self.c.start()
        self.is_server_running = is_server_running
        if self.is_server_running == True:
            self.s = socket.socket()
            self.host = '192.168.29.139'
            self.port = 9997  # Must be same as that in server.py
            print('If you dont see working fine as the next msg , change the host as the ip adress of pi')
            # In client.py we use another way to bind host and port together by using connect function()
            self.s.connect((self.host, self.port))
            print('Working fine!')
        self.listener = keyboard.Listener(
            on_press=self.on_press,
            on_release=self.on_release)
        self.done = False

    def run(self):
        self.listener.start()
        while self.done == False:
            continue

    def sendDataToNode(self, m_no, pos):
        for motor in range(1, 9):
            if motor == m_no:
                self.c.write("m" + str(motor), pos)
            else:
                self.c.write("m" + str(motor), 0)

    def send(self, data):
        if self.is_server_running == False:
            return
        self.s.send(str.encode(data))
        checkDataTransfer = self.s.recv(1024)
        print(checkDataTransfer)

    def forward(self, num):
        motornumber = int(format(num)[1])
        print(motornumber)
        data = str(2) + ','
        for i in range(1,9):
            if i == motornumber:
                data = data + str(self.speeds[motornumber]) + ','
            else:
                data = data + str(0) + ','
        print(data)
        self.send(data)
        self.sendDataToNode(motornumber, 1)

    def back(self, num):
        motornumber = int(format(num)[1])
        data = str(1) + ','
        for i in range(1,9):
            if i == motornumber:
                data = data + "-" + str(self.speeds[motornumber]) + ','
            else:
                data = data + str(0) + ','
        print(data)
        self.send(data)
        self.sendDataToNode(motornumber, -1)
        
    def stopall(self):
        data = str(1) + ','
        for i in range(1,9):
            data = data + str(0) + ','
        print(data)
        self.send(data)
        self.sendDataToNode(-1, 1)
    
    def deactivate(self):
        self.numkey == ""
        self.active = False
        self.c.write("status_science", -1)

    def activate(self):
        self.active = True
        self.c.write("status_science", 1)

    def capture_spectro(self):
        resp = requests.get(self.add_capture_spectro)
        with open('spectrometer/file' + str(self.img_no_spectro) + '.jpg', 'wb') as f:
	        f.write(resp.content)
        self.img_no_spectro += 1

    def capture_micro(self):
        img_no = 0
        for i in range(20):
            resp = requests.get(self.add_capture_micro)
            with open('microscope/folder' + str(self.img_no_micro) + '/file' + str(i) + '.jpg', 'wb') as f:
                f.write(resp.content)
        self.img_no_micro += 1

    def on_press(self, key):
        print("finding",format(key))
        if(format(key) == "'a'"):
            self.deactivate()
        elif(format(key) == "'p'"):
            self.deactivate()
        elif(format(key) == "'s'"):
            self.activate()
        elif self.active == False:
            print("Science module is inactive right now.")
            print("If you want to activate the science module, then press the s key!")
            return
        elif(format(key) == "'c'"):
            self.capture_spectro()
            print("Spectrometer Image " + str(self.img_no_spectro) + " captured!")
        elif(format(key) == "'m'"):
            self.capture_micro()
            print("Microscope Image " + str(self.img_no_micro) + "captured!")
        elif(format(key) in ["'1'","'2'","'3'","'4'","'5'","'6'","'7'", "'8'"]):
            self.numkey = key  
        elif(format(key) == 'Key.up'):
            if self.numkey == "":
                print("Please select a motor")
            else:
                self.forward(self.numkey)
        elif(format(key) == 'Key.down'):
            if self.numkey == "":
                print("Please select a motor")
            else:
                self.back(self.numkey)
        elif(format(key) == 'Key.enter'):
            print("Deleting science module")
            self.done = True

    def on_release(self, key):
        self.stopall()
        if key == keyboard.Key.esc:      # Stop listener
            return False

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--server", type = bool, default = False, help = "Is the server running")
    args = vars(ap.parse_args())
    if args["server"] == True:
        try:
            requests.get(Server, timeout = 0.1)
        except requests.exceptions.ReadTimeout: 
            pass

    sc_module = Science(args["server"])
    sc_module.run()
    del sc_module
