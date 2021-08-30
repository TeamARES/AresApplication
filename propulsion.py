import socket
import time 
from pynput import keyboard 
import threading 
import argparse
from socketengine import client

class Motor_Controls:
    def __init__(self, is_server_running):
        self.is_server_running = is_server_running
        self.motorspeed1 = 0
        self.motorspeed2 = 0
        self.stepsize = 5
        self.dec_stepsize = 5
        self.forwardBackwardSpeed = 0
        self.leftRightSpeed = 0
        self.c = client(addr = "127.0.0.1", port = 8000)
        self.c.start()
        if self.is_server_running == True:
            self.host = '192.168.29.139'
            self.port = 9999
            self.done = False
            self.s = socket.socket()
            self.s.connect((self.host, self.port))
        self.deaclereration_counter = time.perf_counter()
        self.listener = keyboard.Listener(
        on_press=self.on_press,
        on_release=self.on_release)
        self.decelerate_thread = threading.Thread(target=self.decelerate, name="decelerate")
    
    def run(self):
        self.listener.start()
        self.decelerate_thread.start()
    
    def sendDataToNode(self):
        self.motorspeed1 = self.forwardBackwardSpeed
        self.motorspeed2 = self.forwardBackwardSpeed
        self.motorspeed1 -= self.leftRightSpeed
        self.motorspeed2 += self.leftRightSpeed
        if (self.motorspeed1 > 100):
            self.motorspeed1 = 100
        elif (self.motorspeed1 < -100):
            self.motorspeed1 = -100
            
        if (self.motorspeed2 > 100):
            self.motorspeed2 = 100
        elif (self.motorspeed2 < -100):
            self.motorspeed2 = -100
        self.c.write("speed-fl", self.motorspeed2)
        self.c.write("speed-bl", self.motorspeed2)
        self.c.write("speed-br", self.motorspeed1)
        self.c.write("speed-fr", self.motorspeed1)

    def sendDatatoXavier(self):
        if self.is_server_running == False:
            return
        stringData = '0,' + str(self.forwardBackwardSpeed) + ',' + str(self.leftRightSpeed)
        # Sendng this data from socket to the Xavier
        self.s.send(str.encode(stringData))
        # After sending we check if it was recieved or not
        checkDataTranfer = self.s.recv(1024)
        print(checkDataTranfer)

    def increaseForwardBackwardSpeed(self):
        self.forwardBackwardSpeed = min(self.forwardBackwardSpeed + self.stepsize, 100)
        self.printSpeeds()
        self.sendDataToNode()
        self.sendDatatoXavier()

    def decreaseForwardBackwardSpeed(self):
        self.forwardBackwardSpeed = max(self.forwardBackwardSpeed - self.stepsize, -100)
        self.printSpeeds()
        self.sendDataToNode()
        self.sendDatatoXavier()

    def increaseleftRightSpeed(self):
        self.leftRightSpeed = min(self.leftRightSpeed + self.stepsize, 100)
        self.printSpeeds()
        self.sendDataToNode()
        self.sendDatatoXavier()

    def decreaseleftRightSpeed(self):
        self.leftRightSpeed = max(self.leftRightSpeed - self.stepsize, -100)
        self.printSpeeds()
        self.sendDataToNode()
        self.sendDatatoXavier()

    def stopMotor(self):
        self.leftRightSpeed = 0
        self.forwardBackwardSpeed = 0
        self.printSpeeds()
        self.sendDataToNode()
        self.sendDatatoXavier()

    def printSpeeds(self):
        stringData = '0,' + str(self.forwardBackwardSpeed) + ',' + str(self.leftRightSpeed)
        print(" - ",stringData)

    def on_press(self, key):
        self.deaclereration_counter = time.perf_counter()
        if(format(key)=='Key.up'):
            self.increaseForwardBackwardSpeed()
        elif(format(key)=='Key.down'):
            self.decreaseForwardBackwardSpeed()
        elif(format(key)=='Key.left'):
            self.decreaseleftRightSpeed()
        elif(format(key)=='Key.right'):
            self.increaseleftRightSpeed()
        elif(format(key) == 'Key.space'):
            print('stopingMotor')
            self.stopMotor()

    def on_release(self, key):
        if key == 'Key.esc':    
            return False

    def decelerate(self):
        while True:
            stop_deaclereration_counter = time.perf_counter()
            if stop_deaclereration_counter - self.deaclereration_counter >= 0.1:
                if self.forwardBackwardSpeed >= self.dec_stepsize:
                    self.forwardBackwardSpeed -= self.dec_stepsize
                elif self.forwardBackwardSpeed <= -self.dec_stepsize:
                    self.forwardBackwardSpeed += self.dec_stepsize
                if self.leftRightSpeed >= self.dec_stepsize:
                    self.leftRightSpeed -= self.dec_stepsize
                elif self.leftRightSpeed <= -self.dec_stepsize:
                    self.leftRightSpeed += self.dec_stepsize
                self.deaclereration_counter = time.perf_counter()
                self.sendDatatoXavier()
                self.printSpeeds()
                self.sendDataToNode()
            if not self.listener.running:
                break

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--server", type = bool, default = False, help = "Is the server running")
    args = vars(ap.parse_args())
    motor_controls = Motor_Controls(args["server"])
    motor_controls.run()
