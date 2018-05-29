var analyzer = require('dataanalyzer')

var numbersArray = [12, 14, 12, 15, 53, 55, 56, 57, 100, 111, 105]
var absoluteDistance = 20
var method = "minmax"

var result = analyzer.recalculateData(numbersArray, absoluteDistance, method)
console.log(result);
//Result => [ '13.500', '55.000', '105.500' ]