let operation = '';
let calcOperation = $(".result").attr("value");
let result = '';
let deleteNumber = -1;
const operationMemory = [];
const results = [];
let pushedEqual = 0; 

$(".number").on("click", e => {
    

    operation += e.target.innerText;
    calcOperation += e.target.innerText;
    calc(calcOperation);

    $(".operation").attr("value", operation);
    deleteNumber = -1;
});

$(".point").on("click", e => {
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
    if (operation != '') {
        operation = parseFloat(operation) / 100;
        calcOperation = parseFloat(calcOperation) / 100
        calc(calcOperation);
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".plus").on("click", e => {
    if (calcOperation[calcOperation.length - 1] !== '+'){
        operation += ' + ' ;
        calcOperation += '+';
        $(".operation").attr("value", operation);
    }

    deleteNumber = -1;
});

$(".minus").on("click", e => {
    if (calcOperation[calcOperation.length - 1] !== '-') {
        operation += ' - ';
        calcOperation += '-';
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".times").on("click", e => {
    if (calcOperation[calcOperation.length - 1] !== '*') {
        operation += ' x ';
        calcOperation += '*';
        $(".operation").attr("value", operation);
    }
    deleteNumber = -1;
});

$(".divide").on("click", e => {
    if (calcOperation[calcOperation.length - 1] !== '/') {
        operation += ' ÷ ';
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

$(".ac").on("click", e => {
    $(".operation").attr("value", '');
    $(".result").attr("value", '').css("color", "gray");
    $(".result").css("font-size", "1.5rem")
    $(".result").attr("value", "0");
    operation = '';
    calcOperation = '';
    deleteNumber = -1;
});

$(".fa-sun").on("click", e => {
    $("body").removeClass("dark-mode");
    $("body").addClass("light-mode");
    $(".fa-moon").removeClass("active-moon");
    $(".fa-sun").addClass("active-sun");
    deleteNumber = -1;
});

$(".fa-moon").on("click", e => {
    $("body").addClass("dark-mode");
    $("body").removeClass("light-mode");
    $(".fa-moon").addClass("active-moon");
    $(".fa-sun").removeClass("active-sun");
    deleteNumber = -1;
});

function calc(op) {
    result = eval(op);
    $(".result").attr("value", `= ${parseFloat(result).toLocaleString('en-US')}`);
}