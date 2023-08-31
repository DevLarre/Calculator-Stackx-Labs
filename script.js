/*function displaynum(n1) {
    Calculator.text1.value = Calculator.text1.value + n1;
}*/

let history = [];
toggleTheme(); // Aplicar um tema como padrão (dark ou light)

function updateHistory(expression, result) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    history.push({ expression, result, date: formattedDate }); // Armazena um objeto contendo expressão, resultado e data
    const historyList = document.querySelector('.history-list');
    
    const newHistoryItem = document.createElement('li');
    newHistoryItem.classList.add('history-item');
    newHistoryItem.innerHTML = `
        <div class="history-date">${formattedDate}</div>
        <div class="history-result">${expression} = ${result}</div>
    `;
    
    historyList.appendChild(newHistoryItem);

    const historyPanel = document.querySelector('.history-panel');
    historyPanel.scrollTop = historyPanel.scrollHeight;
}

function displaynum(n1) {
    const currentDisplayValue = Calculator.text1.value;

    if (currentDisplayValue.length < 15) {
        Calculator.text1.value = currentDisplayValue + n1;
    }
}

function calculate() {
    const expression = Calculator.text1.value;
    const result = eval(expression);
    Calculator.text1.value = result;
    updateHistory(expression, result);
}

function clearCalculator() {
    Calculator.text1.value = '';
}

function clearHistory() {
    history = [];
    const historyList = document.querySelector('.history-list');
    historyList.innerHTML = '';
}

function copyHistoryToClipboard() {
  const historyText = history.map(entry => `${entry.dateTime} - ${entry.expression} = ${entry.result}`).join('\n');
  navigator.clipboard.writeText(historyText);

  const copyButton = document.querySelector('.copy-button');
  copyButton.innerText = 'Histórico Copiado!';
  setTimeout(() => {
      copyButton.innerText = 'Copiar Histórico';
  }, 2000); // Reverte para o texto original após 2 segundos
}

function exportToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," + history.map(entry => `${entry.date}, ${entry.expression} = ${entry.result}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historico.csv");
    document.body.appendChild(link);
    link.click();
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.src = 'imagens/LUA PRETO E BRANCO.png'; // Trocar para o ícone de sol
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.src = 'imagens/SOL_PRETO_E_BRANCO-removebg-preview.png'; // Trocar para o ícone de lua
    }
}

function handleKeyPress(event) {
    const keyPressed = event.key;

    if (keyPressed.match(/[0-9+\-*/.=]/)) {
        displaynum(keyPressed);
    } else if (keyPressed === "Enter") {
        calculate();
        event.preventDefault
    } else if (keyPressed === "Backspace") {
        clearCalculator();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "CapsLock") {
        toggleTheme();
    }
});

  