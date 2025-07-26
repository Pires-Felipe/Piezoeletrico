// Código base inicial

const int piezoPin = A0; // Pino analógico conectado as pastilhas

void setup() {
  Serial.begin(9600); // Inicia comunicação serial
}

void loop() {
  int sensorValue = analogRead(piezoPin); // Lê valor de 0 a 1023
  float voltage = sensorValue * (5.0 / 1023.0); // Converte para tensão (0-5V)

  Serial.print("Valor bruto: ");
  Serial.print(sensorValue);
  Serial.print(" | Tensão (V): ");
  Serial.println(voltage);

  delay(100); // Aguarda um pouco antes da próxima leitura
}





// código com led

const int piezoPin = A0;     // Entrada analógica da pastilha
const int ledPin = 13;       // LED indicador (pode ser o embutido)
const int threshold = 100;   // Limite para detectar vibração (ajuste conforme necessário)
const int numSamples = 10;   // Número de amostras para média

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int avgSensorValue = getAverageSensorValue();
  float voltage = avgSensorValue * (5.0 / 1023.0);

  Serial.print("Média: ");
  Serial.print(avgSensorValue);
  Serial.print(" | Tensão: ");
  Serial.println(voltage, 3); // 3 casas decimais

  if (avgSensorValue > threshold) {
    digitalWrite(ledPin, HIGH); // Vibração detectada
  } else {
    digitalWrite(ledPin, LOW);
  }

  delay(50); // Pequeno intervalo entre leituras
}

// Função para ler múltiplas amostras e calcular média
int getAverageSensorValue() {
  long sum = 0;
  for (int i = 0; i < numSamples; i++) {
    sum += analogRead(piezoPin);
    delay(1); // Pequeno delay entre amostras
  }
  return sum / numSamples;
}
