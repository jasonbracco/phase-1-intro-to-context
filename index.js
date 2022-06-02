function createEmployeeRecord(element){
    let timeInArray = []
    let timeOutArray = []
    let singleEmployeeRecord = {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: timeInArray,
        timeOutEvents: timeOutArray
    }
    return singleEmployeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    const employeeRecords = arrayOfArrays.map(element => createEmployeeRecord(element))
    return employeeRecords
}
//Takes in an employee record object
//Takes a data string 
//from the data string, it creats a data and an hour 
//creates an object containing the date and the hour parsed from that string, as well as a type 
//adds that object to the timeIn key as an array in the employee record 
function createTimeInEvent(singleEmployeeRecord, dateString){
    let timeInDateHourArray = dateString.split(" ")
    let date = timeInDateHourArray[0]
    let hour = timeInDateHourArray[1]
    let timeInObject = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    singleEmployeeRecord.timeInEvents.push(timeInObject)
    return singleEmployeeRecord
}

function createTimeOutEvent(singleEmployeeRecord, dateString){
    let timeOutDateHourArray = dateString.split(" ")
    let date = timeOutDateHourArray[0]
    let hour = timeOutDateHourArray[1]
    let timeOutObject = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    singleEmployeeRecord.timeOutEvents.push(timeOutObject)
    return singleEmployeeRecord
}

function hoursWorkedOnDate(singleEmployeeRecord, dateString){
    let dateTimeClockedIn = singleEmployeeRecord.timeInEvents[0].hour
    let dateTimeClockedOut = singleEmployeeRecord.timeOutEvents[0].hour
    if (dateString === singleEmployeeRecord.timeInEvents[0].date){
        return((dateTimeClockedOut-dateTimeClockedIn)/100)
    }
}

function wagesEarnedOnDate(singleEmployeeRecord, dateString){
    for(let i=0;i<singleEmployeeRecord.timeInEvents.length;i++){
    let dateTimeClockedIn = singleEmployeeRecord.timeInEvents[i].hour
    let dateTimeClockedOut = singleEmployeeRecord.timeOutEvents[i].hour
    let payRate = singleEmployeeRecord.payPerHour
        if (dateString === singleEmployeeRecord.timeInEvents[i].date){
            return(((dateTimeClockedOut-dateTimeClockedIn)/100)*payRate)
        }
    }
}

function allWagesFor(singleEmployeeRecord){
    let everyWorkEvent = Object.entries(singleEmployeeRecord)
    let individualDates = everyWorkEvent[4][1] 
    let dateArray = individualDates.map(element => element.date)
    let wagesEarnedEachDay = []
    dateArray.forEach(element => {
        wagesEarnedEachDay.push(wagesEarnedOnDate(singleEmployeeRecord, element))
    })
    let initialValue = 0
    let sumOfTotalWages = wagesEarnedEachDay.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
    return sumOfTotalWages
}

function calculatePayroll(arrayOfEmployees){
    let dateArray = []
    let employeeArray = []
    for(let i=0;i<arrayOfEmployees.length;i++){
        let eachEmployee = arrayOfEmployees[i]
        employeeArray.push(eachEmployee)
            for(let i=0;i<eachEmployee.timeInEvents.length;i++){
                let eachDate = eachEmployee.timeInEvents[i].date
                dateArray.push(eachDate)
            }
    }
    let totalWages = []
    console.log(dateArray)
    console.log(employeeArray)
    employeeArray.forEach(element => {
        for(let i=0;i<dateArray.length;i++)
            totalWages.push(wagesEarnedOnDate(element, dateArray[i]))
    })
    console.log(totalWages)
    let initialValue = 0
    let sumOfTotalWages = totalWages.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
    return sumOfTotalWages
}










