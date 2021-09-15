from pynput import keyboard
import socket
import argparse
import requests
from socketengine import client
import requests

Server = 'http://192.168.29.139:8000/robotic_arm'
class RoboticArm:
    def __init__(self, is_server_running):
        self.speeds = dict()
        self.speeds.update({1 : 1})
        self.speeds.update({2 : 1})
        self.speeds.update({3 : 1})
        self.speeds.update({4 : 1})
        self.speeds.update({5 : 1})
        self.speeds.update({6 : 1})
        self.numkey = ""
        self.active = False
        self.c = client(addr = "127.0.0.1", port = 8001)
        self.c.start()
        self.is_server_running = is_server_running
        if self.is_server_running == True:
            self.s = socket.socket()
            self.host = '192.168.29.139'
            self.port = 9998  # Must be same as that in server.py
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
        for motor in range(1, 7):
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
        data = str(1) + ','
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
        self.active = False
        self.c.write("status_arm", -1)
        self.numkey = ""

    def activate(self):
        self.active = True
        self.c.write("status_arm", 1)

    def Stop(self):
        print("Exit initiated")
        self.deactivate()
        self.stopall()
        self.s.send(str.encode("stop"))
        # After sending we check if it was recieved or not
        checkDataTranfer = self.s.recv(1024)
        print(checkDataTranfer)
        self.done = True
        self.c.close()
        self.s.close()

    def on_press(self, key):
        print("finding",format(key))
        if(format(key) == "'a'"):
            self.activate()
        elif(format(key) == "'p'"):
            self.deactivate()
        elif(format(key) == "'s'"):
            self.deactivate()
        elif self.active == False:
            print("Arm is inactive right now.")
            print("If you want to activate the arm, then press the a key!")
            return
        elif(format(key) in ["'1'","'2'","'3'","'4'","'5'","'6'"]):
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
        elif(format(key) == "'q'"):
            self.Stop()

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

    arm = RoboticArm(args["server"])
    arm.run()
    del arm
