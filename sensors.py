import socket
import time 
from socketengine import client

class Sensor:
    def __init__(self):
        self.pressure = 0
        self.altitude = 0
        self.temperature_bmp = 0
        self.luminosity = 0
        self.humidity = 0
        self.temperature_dht = 0
        self.methane = 0
        self.ammonia = 0
        self.moisture = 0
        self.linear_acc_x = 0
        self.linear_acc_y = 0
        self.linear_acc_z = 0
        self.angular_vel_x = 0
        self.angular_vel_y = 0
        self.angular_vel_z = 0
        self.yaw = 0
        self.pitch = 0
        self.roll = 0
        self.s = socket.socket()
        self.host = ""
        self.port = 9995
        self.c = client(addr = "127.0.0.1", port = 8004)
        self.c.start()
        while True:
            try:  
                s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                print("Binding the Port: " + str(self.port))
                self.s.bind((self.host, self.port))
                self.s.listen(5)
                break
            except socket.error as msg:
                print("Socket Binding error" + str(msg) + "\n" + "Retrying...")

        self.conn, self.address = self.s.accept()
        print("Connection has been established! |" + " IP " + self.address[0] + " | Port" + str(self.address[1]))
        self.read_commands()

    def sendDataToNode(self):
        self.c.write("pressure", self.pressure)
        self.c.write("altitude", self.altitude)
        self.c.write("temperature-bmp", self.temperature_bmp)
        self.c.write("luminosity", self.luminosity)
        self.c.write("humidity", self.humidity)
        self.c.write("temperature_dht", self.temperature_dht)
        self.c.write("methane", self.methane)
        self.c.write("ammonia", self.ammonia)
        self.c.write("moisture", self.moisture)
        self.c.write("linear_acc_x", self.linear_acc_x)
        self.c.write("linear_acc_y", self.linear_acc_y)
        self.c.write("linear_acc_z", self.linear_acc_z)
        self.c.write("angular_vel_x", self.angular_vel_x)
        self.c.write("angular_vel_y", self.angular_vel_y)
        self.c.write("angular_vel_z", self.angular_vel_z)
        self.c.write("yaw", self.yaw)
        self.c.write("pitch", self.pitch)
        self.c.write("roll", self.roll)
        
    def read_commands(self):
        while True:
            dataFromBase = str(self.conn.recv(1024),"utf-8")
            print("\n Received Data = " + dataFromBase)
            if(len(dataFromBase) > 3):
                self.send_commands('YES')
                index1 = dataFromBase.index(',')
                modeStr = dataFromBase[0:index1]
                self.sensor(dataFromBase, index1)
            else:
                self.send_commands('NO')
    
    def send_commands(self, data):
        self.conn.send(str.encode(data))
    
    def sensor(self, dataFromBase, index1):

        index2 = dataFromBase.index(',',index1 + 1)
        pressure = dataFromBase[index1 + 1 : index2]
        self.pressure = float(pressure)

        index3 = dataFromBase.index(',',index2 + 1)
        altitude = dataFromBase[index2 + 1 : index3]
        self.altitude = float(altitude)

        index4 = dataFromBase.index(',',index3 + 1)
        temperature_bmp = dataFromBase[index3 + 1 : index4]
        self.temperature_bmp = float(temperature_bmp)

        index5 = dataFromBase.index(',',index4 + 1)
        luminosity = dataFromBase[index4 + 1 : index5]
        self.luminosity = float(luminosity)

        index6 = dataFromBase.index(',',index5 + 1)
        humidity = dataFromBase[index5 + 1 : index6]
        self.humidity = float(humidity)

        index7 = dataFromBase.index(',',index6 + 1)
        temperature_dht = dataFromBase[index6 + 1 : index7]
        self.temperature_dht = float(temperature_dht)

        index8 = dataFromBase.index(',',index7 + 1)
        methane = dataFromBase[index7 + 1 : index8]
        self.methane = float(methane)

        index9 = dataFromBase.index(',',index8 + 1)
        ammonia = dataFromBase[index8 + 1 : index9]
        self.ammonia = float(ammonia)

        index10 = dataFromBase.index(',',index9 + 1)
        moisture = dataFromBase[index9 + 1 : index10]
        self.moisture = float(moisture)

        index11 = dataFromBase.index(',', index10 + 1)
        linear_acc_x = dataFromBase[index10 + 1 : index11]
        self.linear_acc_x = float(linear_acc_x)

        index12 = dataFromBase.index(',', index11 + 1)
        linear_acc_y = dataFromBase[index11 + 1 : index12]
        self.linear_acc_y = float(linear_acc_y)

        index13 = dataFromBase.index(',', index12 + 1)
        linear_acc_z = dataFromBase[index12 + 1 : index13]
        self.linear_acc_z = float(linear_acc_z)

        index14 = dataFromBase.index(',', index13 + 1)
        angular_vel_x = dataFromBase[index13 + 1 : index14]
        self.angular_vel_x = float(angular_vel_x)

        index15 = dataFromBase.index(',', index14 + 1)
        angular_vel_y = dataFromBase[index14 + 1 : index15]
        self.angular_vel_y = float(angular_vel_y)

        index16 = dataFromBase.index(',', index15 + 1) 
        angular_vel_z = dataFromBase[index15 + 1 : index16]
        self.angular_vel_z = float(angular_vel_z)

        index17 = dataFromBase.index(',', index16 + 1)
        yaw = dataFromBase[index16 + 1 : index17]
        self.yaw = float(yaw)

        index18 = dataFromBase.index(',', index17 + 1)
        pitch = dataFromBase[index17 + 1 : index18]
        self.pitch = float(pitch)

        roll = dataFromBase[index18+1:]
        self.roll = float(roll)
        self.sendDataToNode()
        
if __name__ == "__main__":
    sensor = Sensor()
    del sensor






