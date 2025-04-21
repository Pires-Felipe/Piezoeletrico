from flask import Flask, render_template, jsonify
import serial
import time
from threading import Thread
from serial import SerialException

app = Flask(__name__)
serial_port = None
dados_sensor = []

def ler_dados_serial(porta='COM7', baudrate=9600):
    """Lê dados da porta serial continuamente e os armazena na lista dados_sensor, com tentativa de reconexão."""
    global serial_port
    while True:  # Loop infinito para tentar manter a conexão
        try:
            if serial_port is None or not serial_port.is_open:
                try:
                    serial_port = serial.Serial(porta, baudrate)
                    print(f"Conectado à porta {porta} com sucesso!")
                except serial.SerialException as e:
                    print(f"Erro ao abrir a porta {porta}: {e}. Tentando novamente em 5 segundos...")
                    serial_port = None # Reset para tentar novamente
                    time.sleep(5)
                    continue  # Volta para o início do loop para tentar novamente

            if serial_port and serial_port.is_open and serial_port.in_waiting > 0:
                try:
                    linha = serial_port.readline().decode('utf-8').rstrip()
                    try:
                        valor = float(linha)
                        dados_sensor.append(valor)
                        print(f"Dados recebidos e adicionados: {valor}")
                        print(f"Tamanho da lista dados_sensor: {len(dados_sensor)}")
                        if len(dados_sensor) > 100:
                            dados_sensor.pop(0)
                    except ValueError:
                        print(f"Erro ao converter para float: {linha}")
                except UnicodeDecodeError:
                    print("Erro de decodificação Unicode.")
            time.sleep(0.1)

        except Exception as e:
            print(f"Erro inesperado na thread serial: {e}")
            time.sleep(5)
        finally:
            pass # Não fechamos a porta aqui, a thread tenta manter ela aberta

@app.route('/')
def index():
    """Rota para a página principal do dashboard."""
    return render_template('index.html')

@app.route('/dados')
def get_dados():
    """Rota para fornecer os dados do sensor em formato JSON."""
    return jsonify(dados=dados_sensor)

if __name__ == '__main__':
    # Iniciar a leitura da serial em uma thread separada para não bloquear o Flask
    serial_thread = Thread(target=ler_dados_serial, kwargs={'porta': 'COM7'})
    serial_thread.daemon = True
    serial_thread.start()
    app.run(debug=True)