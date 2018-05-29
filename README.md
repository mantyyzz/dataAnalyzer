# dataAnalyzer


## dataanalyzer
> Analyze array of numeric data, group them and calculate value from group


## Install

```sh
npm install dataanalyzer --save
```

## What's this?

Small libary that analyze array of numeric data, group them by selected absolute value distance and calculate one average value in group using different method. It can read your data from file also.

## Usage
### Simple
```js
	var analyzer = require('dataanalyzer')

	var numbersArray = [12,14,12,15,53,55,56,57,100,111,105]
	var absoluteDistance = 20
	var method = "minmax"

	var result = analyzer.recalculateData(numbersArray,absoluteDistance,method)
	console.log(result);
	//Result => [ '13.500', '55.000', '105.500' ]
```

### Read data from file
To read from file we are using `readline` library so numbers in file must be line by line (one number in line). As the underlying library uses asynchronous read from file you have to declare callback function to get calculations result.
```js
	var analyzer = require('dataanalyzer')
	var fileName = "example.txt"
	var absoluteDistance = 20
	var method = "minmax"

	var result = analyzer.recalculateDataFromFile(fileName,absoluteDistance,method,function(result){
		//Callback function to get result
		console.log(result)
	})
```
## API
## recalculateData(array, distance, method)
### Params:

* `array` - numbers array to analyze
* `distance` - absolute interval to determine which values comes in group
* `method` available methods:
  * `minmax` - finds minimum and maximum value in group and takes average value.
  * `average` - calculates average value from all numbers in group.
  * `mostoccurring` - filters two most occurring values in group and then calculates average from them.

### Return:

* **Array**

## recalculateDataFromFile(pathToFile,distance, method, callback)
### Params:

* `pathToFile` - file path to read from
* `distance` - absolute interval to determine which values comes in group
* `method` available methods:
  * `minmax` - finds minimum and maximum value in group and takes average value.
  * `average` - calculates average value from all numbers in group.
  * `mostoccurring` - filters two most occurring values in group and then calculates average from them.
* `callback` - callback function to get result

### Return:

* **Array** 

## License

MIT License © [mantyyzz]
