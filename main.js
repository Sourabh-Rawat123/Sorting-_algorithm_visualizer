const arraySizeInput = document.getElementById('a_size');
const generateButton = document.getElementById('a_generate');
const algorithmButtons = document.querySelectorAll('.algo-btn');
const arrayContainer = document.getElementById('array-container');
const placeholder = document.getElementById('placeholder');

// Generate random array
function generateArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

// Create bars to visualize array
function createBars(array) {
    arrayContainer.innerHTML = ''; // Clear previous bars
    placeholder.style.display = array.length ? 'none' : 'block'; // Toggle placeholder

    array.forEach((height) => {
        const bar = document.createElement('div');
        bar.style.height = `${height * 4}px`; // Adjust scale for visibility
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    });
}

// Delay function for animation steps
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Reset bar colors after sorting
function resetBarColors() {
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.remove('active', 'sorted');
        bar.style.backgroundColor = '#007bff';
    });
}

// Bubble Sort Algorithm with Animation
async function bubbleSort(array) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('active');
            bars[j + 1].classList.add('active');

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 4}px`;
                bars[j + 1].style.height = `${array[j + 1] * 4}px`;
            }

            await delay(100);
            bars[j].classList.remove('active');
            bars[j + 1].classList.remove('active');
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

// Selection Sort Algorithm with Animation
async function selectionSort(array) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        bars[i].classList.add('active');

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('active');
            await delay(100);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
            bars[j].classList.remove('active');
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 4}px`;
            bars[minIdx].style.height = `${array[minIdx] * 4}px`;
        }

        bars[i].classList.remove('active');
        bars[i].classList.add('sorted');
    }
    bars[array.length - 1].classList.add('sorted');
}


async function insertionSort(array) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].classList.add('active');

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 4}px`;
            j--;
            await delay(100);
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 4}px`;
        bars[i].classList.remove('active');
        bars[i].classList.add('sorted');
        await delay(100);
    }
    bars.forEach(bar => bar.classList.add('sorted'));
}

// Merge Sort Algorithm with Animation
async function merge(array, start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    let bars = document.querySelectorAll('.bar');

    while (i < left.length && j < right.length) {
        bars[k].classList.add('active');
        await delay(100);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            bars[k].style.height = `${left[i] * 4}px`;
            i++;
        } else {
            array[k] = right[j];
            bars[k].style.height = `${right[j] * 4}px`;
            j++;
        }
        bars[k].classList.remove('active');
        k++;
    }

    while (i < left.length) {
        bars[k].classList.add('active');
        array[k] = left[i];
        bars[k].style.height = `${left[i] * 4}px`;
        bars[k].classList.remove('active');
        i++;
        k++;
    }

    while (j < right.length) {
        bars[k].classList.add('active');
        array[k] = right[j];
        bars[k].style.height = `${right[j] * 4}px`;
        bars[k].classList.remove('active');
        j++;
        k++;
    }
}

async function mergeSort(array, start, end) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);

    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);
    await merge(array, start, mid, end);

    if (start === 0 && end === array.length - 1) {
        document.querySelectorAll('.bar').forEach(bar => bar.classList.add('sorted'));
    }
}

// Quick Sort Algorithm with Animation
async function partition(array, start, end) {
    let pivot = array[start];
    let count = 0;

    for (let i = start + 1; i <= end; i++) {
        if (array[i] <= pivot) count++;
    }

    let pivotIndex = start + count;
    [array[pivotIndex], array[start]] = [array[start], array[pivotIndex]];

    let bars = document.querySelectorAll('.bar');
    bars[start].style.height = `${array[start] * 4}px`;
    bars[pivotIndex].style.height = `${array[pivotIndex] * 4}px`;
    bars[pivotIndex].classList.add('active');
    await delay(100);
    bars[pivotIndex].classList.remove('active');

    let i = start, j = end;
    while (i < pivotIndex && j > pivotIndex) {
        while (array[i] <= pivot) i++;
        while (array[j] > pivot) j--;

        if (i < pivotIndex && j > pivotIndex) {
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i] * 4}px`;
            bars[j].style.height = `${array[j] * 4}px`;
            await delay(100);
        }
    }
    return pivotIndex;
}

async function quickSort(array, start, end) {
    if (start >= end) return;
    let p = await partition(array, start, end);
    await quickSort(array, start, p - 1);
    await quickSort(array, p + 1, end);

    if (start === 0 && end === array.length - 1) {
        document.querySelectorAll('.bar').forEach(bar => bar.classList.add('sorted'));
    }
}

// Heap Sort Algorithm with Animation
async function heapify(array, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let bars = document.querySelectorAll('.bar');

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i] * 4}px`;
        bars[largest].style.height = `${array[largest] * 4}px`;
        await delay(100);
        await heapify(array, n, largest);
    }
}

async function heapSort(array) {
    let bars = document.querySelectorAll('.bar');
    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0] * 4}px`;
        bars[i].style.height = `${array[i] * 4}px`;
        bars[i].classList.add('sorted');
        await delay(100);
        await heapify(array, i, 0);
    }
    bars[0].classList.add('sorted');
}

// Add event listeners to algorithm buttons
algorithmButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        let array = generateArray(arraySizeInput.value);
        createBars(array);

        const algo = event.target.id;
        resetBarColors();
        if (algo === 'bubbleSort') {
            await bubbleSort(array);
        } else if (algo === 'selectionSort') {
            await selectionSort(array);
        } else if (algo === 'insertionSort') {
            await insertionSort(array);
        } else if (algo === 'mergeSort') {
            await mergeSort(array, 0, array.length - 1);
        } else if (algo === 'quickSort') {
            await quickSort(array, 0, array.length - 1);
        } else if (algo === 'heapSort') {
            await heapSort(array);
        }
    });
});

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    resetBarColors();
    arrayContainer.innerHTML = '';
    placeholder.style.display = 'block';
});


let isPaused = false;

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', () => {
    isPaused = true;
});

const resumeButton = document.getElementById('resume');
resumeButton.addEventListener('click', () => {
    isPaused = false;
});


function delay(ms) {
    return new Promise((resolve) => {
        const checkPause = () => {
            if (!isPaused) {
                resolve();
            } else {
                setTimeout(checkPause, 100); 
            }
        };
        setTimeout(checkPause, ms);
    });
}
// Event listener for generate button
generateButton.addEventListener('click', () => {
    let newArray = generateArray(arraySizeInput.value);
    createBars(newArray);
});

// Theme toggling
let lightModeButton = document.getElementById('lightMode');
let darkModeButton = document.getElementById('darkMode');

lightModeButton.addEventListener('click', () => {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
});

darkModeButton.addEventListener('click', () => {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
});

