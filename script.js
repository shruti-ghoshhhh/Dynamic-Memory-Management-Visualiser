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
    

    let bestIndex = -1;

    if (strategy === "firstFit") {
        bestIndex = memory.findIndex(block => !block.allocated && block.size >= processSize);
    } else if (strategy === "bestFit") {
        let minFit = Infinity;
        memory.forEach((block, index) => {
            if (!block.allocated && block.size >= processSize && block.size < minFit) {
                bestIndex = index;
                minFit = block.size;
            }
        });
    } else if (strategy === "worstFit") {
        let maxFit = 0;
        memory.forEach((block, index) => {
            if (!block.allocated && block.size >= processSize && block.size > maxFit) {
                bestIndex = index;
                maxFit = block.size;
            }
        });
    }

    if (bestIndex === -1) {
        alert("Not enough memory available.");
        return;
    }

    let block = memory[bestIndex];

    if (block.size > processSize) {
        memory.splice(bestIndex, 1, 
            { size: processSize, allocated: true, id: processCounter++ },
            { size: block.size - processSize, allocated: false, id: null }
        );
    } else {
        block.allocated = true;
        block.id = processCounter++;
    }

    renderMemory();
}