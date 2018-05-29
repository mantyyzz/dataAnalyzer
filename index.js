const readline = require('readline');
const fs = require('fs');
var dataList = [];

function recalculateData(dataList, range, method = "minmax") {
    var recalculatedData = [];
    if (method == "minmax") {
        //Remove duplicates from data list
        dataList = removeDuplicates(dataList);
        //While original array not empty do checking and filtering
        while (dataList.length > 0) {
            var firstItem = dataList[0];
            //Filter items from original list to other list that fits into x and y radius
            var filteredItems = dataList.filter(arrayItem => Math.abs(arrayItem - firstItem) <= range)
            //Remove filtered items from original list
            filteredItems.forEach(f => dataList.splice(dataList.findIndex(e => e === f), 1));
            //If filtered items have two o more items calculate median value from filtered items and add to final array, else ignore
            if (filteredItems.length >= 1) {
                recalculatedData.push(calculateMiddlePoint(filteredItems))
            }
        }
        return recalculatedData;
    }
    else if (method == "average") {
        while (dataList.length > 0) {
            var firstItem = dataList[0];
            //Filter items from original list to other list that fits into x and y radius
            var filteredItems = dataList.filter(arrayItem => Math.abs(arrayItem - firstItem) <= range)
            //Remove filtered items from original list
            filteredItems.forEach(f => dataList.splice(dataList.findIndex(e => e === f), 1));
            //If filtered items have two o more items calculate median value from filtered items and add to final array, else ignore
            if (filteredItems.length >= 1) {
                recalculatedData.push(filteredItems.avg())
            }         
        }
        return recalculatedData
    }
    else if (method == "third") {
        //While original array not empty do checking and filtering
        while (dataList.length > 0) {
            var firstItem = dataList[0];
            //Filter items from original list to other list that fits into x and y radius
            var filteredItems = dataList.filter(arrayItem => Math.abs(arrayItem - firstItem) <= range)
            //Remove filtered items from original list
            filteredItems.forEach(f => dataList.splice(dataList.findIndex(e => e === f), 1));
            //Remove duplicates from list to check different items
            var filteredItemsWithoutDuplicates = removeDuplicates(filteredItems);
            if (filteredItemsWithoutDuplicates.length > 2) {
                var twoMostOccurancies = countMostDuplicatesOccuranciesInArray(filteredItems)
                recalculatedData.push(calculateMiddlePoint(twoMostOccurancies))
                //Find two most detected values, then determine min and max, and average betwwen them
            }
            else if (filteredItemsWithoutDuplicates.length = 2) {
                recalculatedData.push(calculateMiddlePoint(filteredItems))
            }
        }
        return recalculatedData
    }
}

function recalculateDataFromFile(filename, range, method = "minmax", callback) {
    readFromFile(filename, function(){
       result = recalculateData(dataList,range,method)
       return callback(result)
    })
}

function readFromFile(fileName, callback) {
    const rl = readline.createInterface({
        input: fs.createReadStream(fileName)
    });

    rl.on('line', function (line) {
        //console.log('Line from file:', line);
        var parsedLine = parseFloat(line)
        dataList.push(parsedLine)
    });

    rl.on('close', callback);
    //rl.on('close', recalculateData.bind(null, dataList, range, method));
}

//Removes duplicates from array with objects x and y values
function removeDuplicates(arr) {
    return arr.reduce((unique, o) => {
        if (!unique.find(obj => obj === o)) {
            unique.push(o);
        }
        return unique;
    }, []);
}

//Count duplicates in array and sort them from largest
function countMostDuplicatesOccuranciesInArray(array) {

    //Count duplicate items occurencies
    var o = {};
    array.forEach(function (item) {
        item in o ? o[item] += 1 : o[item] = 1;
    });
    //Order items from largest
    var arr = Object.keys(o).sort(function (a, b) {
        return o[a] < o[b];
    });

    var selectedObjects = [];

    //Select first to most occurent items
    selectedObjects.push(array.find(x => x == arr[0]))
    selectedObjects.push(array.find(x => x == arr[1]))

    return selectedObjects
}

//Find min max values in object array and then find middle point
function calculateMiddlePoint(array) {
    var minObj = array.hasMin();
    var maxObj = array.hasMax();
    return ((minObj + maxObj) / 2).toFixed(3);
}

Array.prototype.hasMin = function () {
    return this.reduce(function (prev, curr) {
        return prev < curr ? prev : curr;
    });
}

Array.prototype.hasMax = function () {
    return this.reduce(function (prev, curr) {
        return prev > curr ? prev : curr;
    });
}

Array.prototype.avg = function () {
    return this.reduce(function (a, b) {
        return a + b;
    }) / this.length;
};

exports.recalculateData = recalculateData;
exports.recalculateDataFromFile = recalculateDataFromFile;