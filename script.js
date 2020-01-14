let taskObj = {};
let arrayIsEmpty = false;
let tasksArr = JSON.parse(window.localStorage.getItem('tasks'));
if (tasksArr == null) {
    tasksArr = [];
    arrayIsEmpty = true;
}
let todaysDate = moment().format("MMM Do YY");
let dateCheck = JSON.parse(window.localStorage.getItem('date'));
console.log(dateCheck);
if (dateCheck === null) {
    todaysDate = moment().format("MMM Do YY")
    console.log('this happened');
};

if (todaysDate != dateCheck) {
    tasksArr = [];
    window.localStorage.removeItem('tasks');
    window.localStorage.setItem('date', JSON.stringify(todaysDate))
}
let today = moment().format('dddd');
console.log(todaysDate);
console.log(today);
let lastHour = parseInt(moment().format('HH'));
if (lastHour > 8 && lastHour < 18) {
$('.text-save[data-taskhour = ' + lastHour + ']').css("background-color", "red");
$('button[data-target = ' + lastHour + ']').attr('class', 'save-btn');

setupHours(lastHour);
};
$('#day').text(today);

getTaskInfo(tasksArr);
console.log(tasksArr);

$('.save-btn').on('click', function(event){
    tasksArr = JSON.parse(window.localStorage.getItem('tasks'));
    if (tasksArr == null) {
        tasksArr = [];
        arrayIsEmpty = true;
    }
    let hourUsed = 'undefined';
    // console.log('clicked');
    let hour = parseInt($(this).attr('data-target'));
    // console.log(hour);
    let task = $('.text-save[data-taskhour = ' + hour + ']').val();
    console.log(task);
    taskObj['taskHour'] = hour;
    taskObj['taskText'] = task;
    if (arrayIsEmpty === true) {
        tasksArr.push(taskObj);
        arrayIsEmpty = false;
    }
    else if (arrayIsEmpty === false) {
        hourUsed = checkIfUsed(tasksArr, taskObj['taskHour']);
        if (hourUsed == 'undefined') {
            tasksArr.push(taskObj);
        }
        else if (hourUsed != 'undefined'){
            tasksArr[hourUsed] = taskObj;
        }
    }
    window.localStorage.setItem('tasks', JSON.stringify(tasksArr));
});

function checkIfUsed(arr, testHour) {
    let test = 'undefined';
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let objHour = obj['taskHour'];
        if (testHour === objHour) {
            test = i;
        }
    }
    return test;
}

function getTaskInfo (arr) {
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        $('.text-save[data-taskhour = ' + obj.taskHour + ']').val(obj.taskText);
    }
}

function setupHours(prevHour) {
    for (let i = (prevHour + 1); i < 18; i++) {
        $('.text-save[data-taskhour = ' + i + ']').css("background-color", "green");
        $('button[data-target = ' + i + ']').attr('class', 'save-btn');
    }
}