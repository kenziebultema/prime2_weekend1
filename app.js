//STATUS:
//normal mode completed
//hard mode completed
//pro mode completed!!

var employeeArray = [];
var monthlyCost = 0;
var counter = 0;

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
        // appendMonthly(monthlyCost);

    });

    $('.container').on('click', '.delete', removeEmployee);

});

//find monthly salary and add up cost
function findMonthly(salary){
    // monthlyCost = 0;
    monthlyCost += Math.round(salary / 12)//* 100) / 100;
    appendMonthly(monthlyCost);
    console.log(monthlyCost);
}

//remove employee from dom
function removeEmployee(event){
    console.log('working');
    // removeSal($(this).parent().data().key);
    var monthlySalary = $(this).data('key');
    console.log("HERE:" , monthlySalary);
    monthlyCost -= monthlySalary;
    appendMonthly(monthlyCost);
    $(this).parent().remove();
}

//finds specific employee, removes them, recalculates monthly cost
// function removeSal(key){
//     monthlyCost = 0;
    // for(var i = 0; i < employeeArray.length; i++){
//         if(key === employeeArray[i].key){
//             console.log(employeeArray);
//             employeeArray.splice(i, 1);
//             console.log(employeeArray);
//             findMonthly(employeeArray[i].employeeYearSalary);
//         }
//     }
// }

//append to DOM(monthly cost)
function appendMonthly(monthlyCost){
    $('.monthlyCost').children().remove();
    $('.monthlyCost').append('<span>$' + monthlyCost + '</span>');
}

//append to DOM (entire employee)
function appendDom(object){
    counter++;
    object.key = counter;
    // console.log('i work');
    $('.container').append('<div class="employee"></div>');
    var $el = $('.container').children().last();

	$el.append("<p class='title'>Employee Name </p><p>" + object.employeeFirstName + " " + object.employeeLastName + "</p>");
	$el.append("<p class='title'>Employee ID </p><p>" + object.employeeID + "</p>");
	$el.append("<p class='title'>Employee Title </p><p>" + object.employeeTitle + "</p>");
	$el.append("<p class='title'>Employee Salary</p><p>$" + object.employeeYearSalary + "</p>");

    $el.append('<button class="delete">Delete Employee</button>');

    //var $deleteButton = $el.find('button');
    var $deleteButton = $el.children().last();
    var calcMonthly = parseInt(Math.round(object.employeeYearSalary / 12))
    $deleteButton.data('key', calcMonthly);

}

console.log('connected');
