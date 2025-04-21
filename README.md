# 🔋 Projeto Piezo – Geração de Energia com Pastilhas Piezoelétricas

Este projeto tem como objetivo explorar a conversão de energia mecânica em elétrica usando pastilhas piezoelétricas. Utilizamos Arduino para a leitura dos dados e Python para o processamento e visualização.

## ⚙️ Tecnologias Utilizadas

- Arduino UNO
- Python 3.x
- Flask (para interface web)
- PySerial (comunicação serial)
- HTML/CSS (front-end simples)

## 🧪 Funcionamento

1. As pastilhas piezoelétricas geram tensão ao serem pressionadas.
2. O Arduino lê essa tensão e envia os dados pela porta serial.
3. O Python recebe os dados e pode exibir na tela ou armazenar.
4. Uma interface web pode mostrar os resultados em tempo real.

## 🚀 Como Executar

### 🔌 Requisitos

- Python instalado (de preferência [site oficial](https://www.python.org/))
- Arduino IDE (para carregar o código na placa)
- Pacotes Python:
  ```bash
  pip install pyserial flask
  ```

### ▶️ Execução

1. **Carregue o código no Arduino** (`piezo.ino`)
2. **Verifique a porta COM correta** do seu Arduino.
3. Execute o script Python:
   ```bash
   python serial-test.py
   ```
4. (Opcional) Rode o app Flask com:
   ```bash
   python app.py
   ```
   Acesse: `http://127.0.0.1:5000`

## 📂 Estrutura do Projeto

```
PIEZO/
│
├── serial-test.py     # Teste de conexão com a porta serial
├── app.py             # App Flask para exibir dados
├── templates/
│   └── index.html     # Página web com os dados
├── piezo.ino          # Código para o Arduino
└── README.md          # Este arquivo
```

## 🧠 Objetivos Futuros

- 📊 Gráficos em tempo real na web
- 💾 Armazenar os dados em CSV ou banco de dados
- 🔋 Melhorar a eficiência do sistema de captação
- 📱 Possível controle via smartphone

## 👨‍🔬 Autores

_**Felipe Miranda Pires, Tainara Raiane Batista Crevelin, Rafael Del Antonio, Elias Gustavo Carriel, Gabrieli Dos Santos Dalzotto, Bruna Viana Mendes**_
FísicaExp | 2025 - Instagram 

---

```
