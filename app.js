var employeeArray = [];
var monthlyCost = 0;

//doc ready
$(document).ready(function(){
    $('.employeeForm').on('submit', function(event){
        event.preventDefault();

        var values = {};

        $.each($('.employeeForm').serializeArray(), function(i, field){
            values[field.name] = field.value;
        });

        $('.employeeForm').find('input[type = text]').val("");
        $('.employeeForm').find('input[type = number]').val("");

        employeeArray.push(values);
        findMonthly(values.employeeYearSalary);
        appendDom(values);
        appendMonthly(monthlyCost);
    });
});

//find monthly salary and add up cost
function findMonthly(salary){
    monthlyCost += Math.round(salary / 12);
    console.log(monthlyCost);
}

//append to DOM(monthly cost)
function appendMonthly(monthlyCost){
    $('.monthlyCost').children().remove();
    $('.monthlyCost').append('<span>$' + monthlyCost + '</span>');
}

//append to DOM (entire employee)
function appendDom(object){
    // console.log('i work');
    $('.container').append('<div class="employee"></div>');
    var $el = $('.container').children().last();

	$el.append("<p class='title'>Employee Name </p><p>" + object.employeeFirstName + " " + object.employeeLastName + "</p>");
	$el.append("<p class='title'>Employee ID </p><p>" + object.employeeID + "</p>");
	$el.append("<p class='title'>Employee Title </p><p>" + object.employeeTitle + "</p>");
	$el.append("<p class='title'>Employee Salary</p><p>$" + object.employeeYearSalary + "</p>");
}

console.log('connected');
