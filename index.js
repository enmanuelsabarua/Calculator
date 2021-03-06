let operation = '';
let calcOperation = $(".result").attr("value");
let result = '';
let deleteNumber = -1;
let operationMemory = [];
let results = [];
let pushedEqual = 0; 
let resultsMemory;
let operationsMemory;
let backMemoryOperation = 0;
let backMemoryResult = 0


$(".number").on("click", e => {
    $(".clean").html("C");
    $(".clean").removeClass("ac");
    $(".clean").addClass("c");


    if (pushedEqual) {
        operationMemory.push(operation);
        results.push(result);

        backMemoryOperation = operationMemory.length - 1;
        backMemoryResult = results.length - 1;

        pushedEqual = 0;
        operation = e.target.innerText;
        calcOperation = e.target.innerText;
        calc(calcOperation);
        $(".operation").attr("value", operation);
        reduceTextResult(0);
        displayMemory();

        return;
    }

    operation += e.target.innerText;
    calcOperation += e.target.innerText;
    calc(calcOperation);

    $(".operation").attr("value", operation);
    deleteNumber = -1;
});

$(".point").on("click", e => {
    if (pushedEqual) {
        operationMemory.push(operation);
        results.push(result);

        operation = e.target.innerText;
        calcOperation = e.target.innerText;
        $(".operation").attr("value", operation);
        reduceTextResult(0);
        displayMemory();
        pushedEqual = 0;

        return;
    }

    if (calcOperation[calcOperation.length - 1] !== '.') {
        operation += e.target.innerText;
        calcOperation += e.target.innerText;
    
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".delete").on("click", e => {
    operation = operation.slice(0, deleteNumber);
    calcOperation = calcOperation.slice(0, deleteNumber);
    $(".operation").attr("value", operation);
});

$(".percent").on("click", e => {
    if (pushedEqual) {
        operationMemory.push(operation);
        results.push(result);
        
        operation = parseFloat(results[results.length - 1]) / 100;
        calcOperation = parseFloat(results[results.length - 1]) / 100;
        console.log(calcOperation);
        calc(calcOperation);
        $(".operation").attr("value", operation);
        reduceTextResult(0);
        pushedEqual = 0;

        return;
    }
    
    if (operation != '') {
        operation = parseFloat(operation) / 100;
        calcOperation = parseFloat(calcOperation) / 100
        calc(calcOperation);
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".plus").on("click", e => {
    addToMemory('+');

    if (calcOperation[calcOperation.length - 1] !== '+'){
        operation += ' + ' ;
        calcOperation += '+';
        $(".operation").attr("value", operation);
    }

    deleteNumber = -1;
});

$(".minus").on("click", e => {
    addToMemory('-');
    
    if (calcOperation[calcOperation.length - 1] !== '-') {
        operation += ' - ';
        calcOperation += '-';
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".times").on("click", e => {
    addToMemory('*');

    if (calcOperation[calcOperation.length - 1] !== '*') {
        operation += ' x ';
        calcOperation += '*';
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".divide").on("click", e => {
    addToMemory('/');
    
    if (calcOperation[calcOperation.length - 1] !== '/') {
        operation += ' ?? ';
        calcOperation += '/';
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".equals").on("click", e => {
    result = eval(calcOperation);
    
    if ($("body").hasClass("light-mode")) {
        $(".result").attr("value", `= ${parseFloat(result).toLocaleString('en-US')}`).css("color", "#292D36");
    } else {
        $(".result").attr("value", `= ${parseFloat(result).toLocaleString('en-US')}`).css("color", "white");
    }

    $(".result").css("font-size", "2.2rem");
    deleteNumber = -1;
    pushedEqual = 1;
});

// Clean the display and memory
$(".clean").on("click", e => {
    if (!$('div').hasClass('memory')) {
        result = '';
        operationMemory = [];
        results = [];
    }

    $(".clean").addClass("c");

    if (operation === '') {
        $(".clean").removeClass("c");
        $(".clean").addClass("ac");
    }

    $(".operation").attr("value", '');
    $(".result").attr("value", "0");
    reduceTextResult(1);
    operation = '';
    calcOperation = '';
    deleteNumber = -1;

    if ($(".clean").hasClass('ac')) {
        operationsMemory = [];
        resultsMemory = [];
        $('.memory').remove();
    } else {
        $(".clean").html("AC");
    }
});

// Bring back the operations
$(".back").on('click', e => {
    operation = operationMemory[backMemoryOperation];

    $(".operation").attr("value", operation);
    $(".result").attr("value", `= ${parseFloat(results[backMemoryResult]).toLocaleString('en-US')}`);
    deleteNumber = -1;
    
    if (backMemoryOperation > 0 || backMemoryResult > 0) {
        backMemoryOperation--;
        backMemoryResult--;
    }
});

// Theme
$(".fa-sun").on("click", e => {
    $("body").removeClass("dark-mode");
    $("body").addClass("light-mode");
    $(".fa-moon").removeClass("active-moon");
    $(".fa-sun").addClass("active-sun");
    $('.theme-color').attr("content", "#FFF")
    deleteNumber = -1;
});

$(".fa-moon").on("click", e => {
    $("body").addClass("dark-mode");
    $("body").removeClass("light-mode");
    $(".fa-moon").addClass("active-moon");
    $(".fa-sun").removeClass("active-sun");
    $('.theme-color').attr("content", "#22252D")
    deleteNumber = -1;
});

function calc(op) {
    result = eval(op);
    $(".result").attr("value", `= ${parseFloat(result).toLocaleString('en-US')}`);
}

function addToMemory(e) {
    if (pushedEqual) {
        operationMemory.push(operation);
        results.push(result);

        pushedEqual = 0;

        if (e === '*') {
            operation = `${results[results.length - 1]} ${' x '}`
        } else if(e === '/') {
            operation = `${results[results.length - 1]} ${' ?? '}`
        } else {
            operation = `${results[results.length - 1]} ${e}`;
        }
        
        calcOperation = `${results[results.length - 1]}${e}`;
        $(".operation").attr("value", operation);
        reduceTextResult(0);

        displayMemory();
    }
}

function reduceTextResult(clean) {
    if (clean === 1) $(".result").attr("value", '').css("color", "gray");
    else $(".result").css("color", "gray");

    $(".result").css("font-size", "1.5rem");
}

function displayMemory() {
    if (results[results.length - 1] != ''){
        operationsMemory = operationMemory[operationMemory.length - 1];
        resultsMemory = parseFloat(results[results.length - 1]).toLocaleString('en-US');

        if (!$("div").hasClass("memory")) {
            $(".inputs").prepend(`<div class='memory'><p>${operationsMemory}</p><p>${resultsMemory}</p></div>`);
        } else {
            $(`<div class='memory'><p>${operationsMemory}</p><p>${resultsMemory}</p></div>`).insertAfter(".memory");
        }
    }
}