// Função para criar partículas no fundo
function createParticles(numParticles) {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 3; // Tamanho aleatório
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.2})`; // Cor ciano com opacidade aleatória
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.setProperty('--direction-x', Math.random() > 0.5 ? 1 : -1);
        particle.style.setProperty('--direction-y', Math.random() > 0.5 ? 1 : -1);
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
    }
}

createParticles(50); // Número de partículas

// Gráfico
const ctx = document.getElementById('voltageChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 150);
gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');

const voltageChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [{
            label: 'Tensão (V)',
            data: Array.from({ length: 20 }, () => Math.random() * 10),
            borderColor: 'cyan',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0, // Remover bolinhas nos pontos
            borderWidth: 2,
            segment: {
                borderColor: 'cyan',
                borderDashOffset: 0,
                borderDash: [],
            }
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#6b7280' },
                grid: { color: 'rgba(107, 114, 128, 0.2)' }
            },
            x: {
                ticks: { color: '#6b7280' },
                grid: { color: 'rgba(107, 114, 128, 0.2)' }
            }
        },
        plugins: {
            legend: { display: false } // Ocultar legenda
        },
        elements: {
            line: {
                tension: 0.4,
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad'
                }
            }
        }
    }
});

// Indicadores com mini gráficos de barra
document.querySelectorAll('.indicator-card').forEach(card => {
    const label = card.dataset.label;
    const icon = card.dataset.icon;
    const color = card.dataset.color;
    const valueText = card.dataset.value;
    const fill = parseFloat(card.dataset.fill) / 100; // Converter para proporção

    card.innerHTML = `
            <div class="text-xl font-bold ${color} flex items-center gap-2 justify-center mb-2">
                <i data-lucide="${icon}" class="w-5 h-5"></i> ${label}
            </div>
            <div class="bg-gray-700 rounded-md overflow-hidden relative h-6 w-3/4">
                <div style="width: ${fill * 100}%; background-color: ${getColorShade(color)}; height: 100%;" class="absolute left-0 top-0"></div>
                <div class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">${valueText}</div>
            </div>
        `;
});
lucide.createIcons();

function getColorShade(tailwindColorClass) {
    // Função simples para escurecer um pouco a cor do Tailwind
    const parts = tailwindColorClass.split('-');
    const baseColor = parts[0];
    const shade = parseInt(parts[1] || '500');
    const newShade = Math.max(100, shade - 200);
    return `<span class="math-inline">\{baseColor\}\-</span>{newShade}`;
}
// Animação de entrada suave
const fadeElements = document.querySelectorAll('.animate-fade-in');
fadeElements.forEach(element => {
    element.classList.add('opacity-0');
    setTimeout(() => {
        element.classList.remove('opacity-0');
    }, 10);
});

const fadeDownElements = document.querySelectorAll('.animate-fade-down');
fadeDownElements.forEach(element => {
    element.classList.add('opacity-0', 'translate-y-5');
    setTimeout(() => {
        element.classList.remove('opacity-0', 'translate-y-5');
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    }, 50);
});

// Atualizar visualização da bateria
function updateBatteryVisual(percentage) {
    const batteryFill = document.getElementById('batteryFill');
    const batteryPercentageText = document.getElementById('batteryPercentage');
    batteryFill.style.width = `${percentage}%`;
    batteryPercentageText.textContent = Math.round(percentage);

   // Alterar cor conforme a bateria diminui
   if (percentage < 20) {
    batteryFill.style.backgroundColor = '#dc2626'; // Vermelho
} else if (percentage < 50) {
    batteryFill.style.backgroundColor = '#facc15'; // Amarelo
} else {
    batteryFill.style.backgroundColor = '#84cc16'; // Verde
}
}

// Atualizar visualização da tensão (efeito líquido)
function updateVoltageLiquid(voltage) {
const voltageLiquidFill = document.getElementById('voltageLiquidFill');
const voltageLiquidText = document.querySelector('.voltage-liquid-text');
const maxHeight = 100; // Altura máxima em porcentagem
const normalizedVoltage = Math.max(0, Math.min(10, voltage)); // Supondo uma escala de 0 a 10V
const fillHeight = (normalizedVoltage / 10) * maxHeight;

voltageLiquidFill.style.height = `${fillHeight}%`;
voltageLiquidText.textContent = `${voltage.toFixed(1)}V`;
}

// Simulação de atualização de dados (para demonstração)
let batteryLevel = 62;
let currentVoltage = 8.7;

setInterval(() => {
batteryLevel = Math.max(0, Math.min(100, batteryLevel + (Math.random() - 0.5) * 5)); // Variação aleatória da bateria
currentVoltage = Math.max(0, Math.min(10, currentVoltage + (Math.random() - 0.5) * 0.5)); // Variação aleatória da tensão
updateBatteryVisual(batteryLevel);
updateVoltageLiquid(currentVoltage);

// Atualizar gráfico (simulando novos dados)
voltageChart.data.labels.shift();
voltageChart.data.labels.push(voltageChart.data.labels[voltageChart.data.labels.length - 1] + 1);
voltageChart.data.datasets[0].data.shift();
voltageChart.data.datasets[0].data.push(currentVoltage);
voltageChart.update();
}, 2000); // Atualizar a cada 2 segundos