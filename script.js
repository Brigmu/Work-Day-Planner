let taskObj = {};
let arrayIsEmpty = false;
let tasksArr = JSON.parse(window.localStorage.getItem('tasks'));
if (tasksArr == null) {
    tasksArr = [];
    arrayIsEmpty = true;
}

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