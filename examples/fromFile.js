var analyzer = require('dataanalyzer')
var fileName = "example.txt"
var absoluteDistance = 20
var method = "minmax"

var result = analyzer.recalculateDataFromFile(fileName, absoluteDistance, method, function (result) {
    //Callback function to get result
    console.log(result)
})