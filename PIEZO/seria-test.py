import serial

try:
    ser = serial.Serial('COM7', 9600, timeout=1)
    print("Conectado com sucesso!")
    ser.close()
except Exception as e:
    print(f"Erro ao conectar: {e}")
