let memory = [];
let memorySize = 0;
let processCounter = 0;

function initializeMemory() {
    memorySize = parseInt(document.getElementById('memorySize').value);
    if (isNaN(memorySize) || memorySize <= 0) {
        alert("Enter a valid memory size.");
        return;
    }
    memory = [{ size: memorySize, allocated: false, id: null }];
    renderMemory();
}

function allocateMemory() {
    let processSize = parseInt(document.getElementById('processSize').value);
    let strategy = document.getElementById('allocationStrategy').value;

    if (isNaN(processSize) || processSize <= 0) {
        alert("Enter a valid process size.");
        return;
    }