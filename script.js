// Obtén los elementos de los rangos, inputs de texto, el cuadro de color, el color picker y el código hexadecimal
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');
const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');
const colorBox = document.getElementById('color-box');
const hexCode = document.getElementById('hex-code');
const colorPicker = document.getElementById('colorPicker');

// Función para convertir a hexadecimal
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

// Función para obtener el valor hexadecimal del color
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Función para convertir de hexadecimal a RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Función para actualizar el cuadro de color y el código hexadecimal
function updateColor() {
    const r = parseInt(redRange.value);
    const g = parseInt(greenRange.value);
    const b = parseInt(blueRange.value);
    
    // Actualiza el color de fondo del cuadro
    colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Actualiza el código hexadecimal mostrado
    hexCode.textContent = rgbToHex(r, g, b);

    // Sincroniza el valor del color picker
    colorPicker.value = rgbToHex(r, g, b);

    // Sincroniza los inputs de texto con los rangos
    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;
}

// Función para actualizar los rangos según los inputs de texto
function updateRangeFromInput() {
    const r = Math.min(255, Math.max(0, parseInt(redInput.value) || 0));
    const g = Math.min(255, Math.max(0, parseInt(greenInput.value) || 0));
    const b = Math.min(255, Math.max(0, parseInt(blueInput.value) || 0));

    // Actualiza los valores de los rangos
    redRange.value = r;
    greenRange.value = g;
    blueRange.value = b;

    // Actualiza el color de fondo del cuadro y el código hexadecimal
    updateColor();
}

// Función para actualizar los valores RGB a partir del color picker
function updateFromColorPicker() {
    const { r, g, b } = hexToRgb(colorPicker.value);

    // Actualiza los valores de los rangos y los inputs de texto
    redRange.value = r;
    greenRange.value = g;
    blueRange.value = b;
    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;

    // Actualiza el cuadro de color y el código hexadecimal
    updateColor();
}

// Escuchar cambios en los controles de rango
redRange.addEventListener('input', updateColor);
greenRange.addEventListener('input', updateColor);
blueRange.addEventListener('input', updateColor);

// Escuchar cambios en los inputs de texto
redInput.addEventListener('input', updateRangeFromInput);
greenInput.addEventListener('input', updateRangeFromInput);
blueInput.addEventListener('input', updateRangeFromInput);

// Escuchar cambios en el color picker
colorPicker.addEventListener('input', updateFromColorPicker);

// Inicializa el cuadro de color
updateColor();
