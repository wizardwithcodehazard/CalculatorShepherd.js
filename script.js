document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.getElementById('buttons');
    const startTourButton = document.getElementById('start-tour');

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn')) {
            handleButtonClick(target.getAttribute('data-value'));
        }
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clearDisplay();
        } else if (value === '←') {
            backspace();
        } else if (value === '%') {
            calculatePercentage();
        } else if (['/', '*', '-', '+'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculateResult();
        } else if (value === '√') {
            calculateSqrt();
        } else if (value === '.') {
            inputDecimal();
        } else {
            inputNumber(value);
        }
    }

    function clearDisplay() {
        display.value = '';
    }

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    function calculatePercentage() {
        display.value = parseFloat(display.value) / 100;
    }

    function handleOperator(op) {
        display.value += ` ${op} `;
    }

    function calculateResult() {
        try {
            Sqrt = Math.sqrt;
            display.value = eval(display.value.replace('√', 'Sqrt'));
        } catch (e) {
            display.value = 'Error';
        }
    }

    function calculateSqrt() {
        display.value = `√(${display.value})`;
    }

    function inputDecimal() {
        if (!display.value.includes('.')) {
            display.value += '.';
        }
    }

    function inputNumber(num) {
        display.value += num;
    }

    // Shepherd.js tour setup
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'class-1 class-2',
            scrollTo: { behavior: 'smooth', block: 'center' }
        }
    });

    tour.addStep({
        title: 'Welcome to the Scientific Calculator',
        text: 'This is a brief tour of the features of the calculator.',
        attachTo: {
            element: '#calculator',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Display',
        text: 'This is where the results of your calculations will be displayed.',
        attachTo: {
            element: '#display',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Buttons',
        text: 'These are the buttons you can use for your calculations. They include numbers, operators, and functions.',
        attachTo: {
            element: '#buttons',
            on: 'top'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        title: 'Start Tour',
        text: 'You can start this tour anytime by clicking this button.',
        attachTo: {
            element: '#start-tour',
            on: 'top'
        },
        buttons: [
            {
                text: 'End Tour',
                action: tour.complete
            }
        ]
    });

    startTourButton.addEventListener('click', () => {
        tour.start();
    });
});
