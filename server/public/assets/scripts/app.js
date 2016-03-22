//STATUS:
//normal mode completed
//hard mode completed
//pro mode completed!!

//RE-DO STATUS:
//normal mode in-progress, can post and get from DB, having difficulty calculating monthly cost with pre-existing content

var employeeArray = [];
var monthlyCost = 0;
var counter = 0;

//doc ready
$(document).ready(function(){
    $('.employeeForm').on('submit', submitEmployee);
    $('.container').on('click', '.delete', removeEmployee);

    //initial append to dom with any pre-existing data
    getEmployee();
});

//removes default refresh of browser on submit, serializes array, empties form fields
function submitEmployee(event){
    event.preventDefault();

    var values = {};

    $.each($('.employeeForm').serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    employeeArray.push(values);
    findMonthly(values.year_salary);
    postToServer(values);

    $('.employeeForm').find('input[type = text]').val("");
    $('.employeeForm').find('input[type = number]').val("");
}

function postToServer(employeeData){
    $.ajax({
        type: 'POST',
        url: '/employees',
        data: employeeData,
        success: serverResponse
    });
}

function serverResponse(response){
    console.log('server response', response);
    getEmployee();
}

function getEmployee(){
    $.ajax({
        type: 'GET',
        url: '/employees',
        success: employeeGot
    });
}

function employeeGot(response){
    console.log('employee got', response);
    appendDom(response);
}

//find monthly salary and add up cost
function findMonthly(salary){
    monthlyCost += Math.round(salary / 12);
    appendMonthly(monthlyCost);
    console.log('monthly cost', monthlyCost);
}

//remove employee from dom
function removeEmployee(event){
    console.log('remove employee working');
    var monthlySalary = $(this).data('key');
    // console.log("monthly salary:", monthlySalary);
    monthlyCost -= monthlySalary;
    appendMonthly(monthlyCost);
    $(this).parent().remove();
}

//append to DOM(monthly cost)
function appendMonthly(monthlyCost){
    $('.monthlyCost').children().remove();
    $('.monthlyCost').append('<span>$' + monthlyCost + '</span>');
}

//append to DOM (entire employee)
function appendDom(person){
    // console.log(person);
    counter++;
    person.key = counter;
    $('.container').empty();

    for(var i = 0; i < person.length; i++){
        $('.container').append('<div class="employee"></div>');
        var $el = $('.container').children().last();

    	$el.append('<p class="title">Employee Name </p><p>' + person[i].first_name + ' ' + person[i].last_name + '</p>');
    	$el.append('<p class="title">Employee ID </p><p>' + person[i].employee_id + '</p>');
    	$el.append('<p class="title">Employee Title </p><p>' + person[i].job_title + '</p>');
    	$el.append('<p class="title">Employee Salary</p><p>$' + person[i].year_salary + '</p>');

        $el.append('<button class="delete">Delete Employee</button>');
    }
    var $deleteButton = $el.children().last();
    var calcMonthly = parseInt(Math.round(person.year_salary / 12))
    $deleteButton.data('key', calcMonthly);
}

console.log('connected');
