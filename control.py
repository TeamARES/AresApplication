from socketengine import host 
import requests
import socket
import argparse
Server = 'http://192.168.29.139:8000/control'

class Control:
    def __init__(self, is_server_running):
        self.h = host(addr = '127.0.0.1', port = 8003)
        self.h.start()
        self.r = 0
        self.g = 0
        self.b = 0
        self.fan1 = 0
        self.fan2 = 0
        self.kill = 0
        self.is_server_running = is_server_running
        if self.is_server_running == True:
            self.H = '192.168.29.139'
            self.port = 9996
            self.done = False
            self.s = socket.socket()
            self.s.connect((self.H, self.port))

    def print_state(self):
        print("R: " + str(self.r) + " G: " + str(self.g) + " B: " + str(self.b))
        print("Fan1: " + str(self.fan1) + " Fan2: " + str(self.fan2))
        print("Kill: " + str(self.kill))
    
    def sendDatatoXavier(self):
        self.print_state()
        if self.is_server_running == False:
            return
        stringData = '3,' + str(self.r) + ',' + str(self.g) + ',' + str(self.b) + ',' + str(self.fan1) + ',' + str(self.fan2) + ',' + str(self.kill)
        # Sendng this data from socket to the Xavier
        self.s.send(str.encode(stringData))
        # After sending we check if it was recieved or not
        checkDataTranfer = self.s.recv(1024)
        print(checkDataTranfer)

    def run(self):
        self.sendDatatoXavier()
        while True:
            data = self.h.get_ALL("r")
            if data:
                if data[0] != self.r:
                    self.r = data[0]
                    self.sendDatatoXavier()
            data = self.h.get_ALL("g")
            if data:
                if data[0] != self.g:
                    self.g = data[0]
                    self.sendDatatoXavier()
            data = self.h.get_ALL("b")
            if data:
                if data[0] != self.b:
                    self.b = data[0]
                    self.sendDatatoXavier()
            data = self.h.get_ALL("fan1")
            if data:
                if data[0] != self.fan1:
                    self.fan1 = data[0]
                    self.sendDatatoXavier()
            data = self.h.get_ALL("fan2")
            if data:
                if data[0] != self.fan2:
                    self.fan2 = data[0]
                    self.sendDatatoXavier()

            data = self.h.get_ALL("kill")
            if data:
                if data[0] != self.kill:
                    self.kill = data[0]
                    self.sendDatatoXavier()

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--server", type = bool, default = False, help = "Is the server running")
    args = vars(ap.parse_args())
    if args["server"] == True:
        try:
            requests.get(Server, timeout = 0.1)
        except requests.exceptions.ReadTimeout: 
            pass

    c = Control(args["server"])
    c.run()
    del c


