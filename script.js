// script.js

// Function to append a number or operator to the display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
  }
  
  // Function to clear the display
  function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
  }
  
  // Function to calculate the result of the expression
  function calculateResult() {
    const display = document.getElementById('display');
    
    // Check for empty expression
    if (display.value.trim() === '') {
      display.value = 'Error';
      return;
    }
  
    // Check for division by zero
    if (display.value.includes('/ 0')) {
      display.value = 'Error';
      return;
    }
  
    try {
      // Evaluate the expression
      const result = eval(display.value);
      // Check if the result is finite, otherwise show 'Error'
      display.value = isFinite(result) ? result : 'Error';
    } catch (error) {
      // Catch any errors (e.g., malformed expression)
      display.value = 'Error';
    }
  }
  
  // Export functions for testing
  module.exports = {
    appendToDisplay,
    clearDisplay,
    calculateResult
  };

  























