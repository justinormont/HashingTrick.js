# HashingTrick.js
Implements feature hashing, also known as the hashing trick, a fast and space-efficient way of vectorizing features. Converts tokenized strings in to a sparse feature vector.

## Installation

```shell
  npm install hashingtrick.js --save
```


## Usage

```js
  var featureHashing = require('featurehashing.js');
  var featureHasher = featureHashing.newFeatureHasher(18); // Feature vector will be 2^18 elements

  var stringsToHash = ['hello', 'world'];
  
  // Hash n-grams
  stringsToHash.forEach(function(str){ featureHasher.add(str); });
  
  console.log(featureHasher.sparseFeatureVector());
  
  console.log('Stats:', 'sparseLength =', featureHasher.sparseLength(), 
    'length =', featureHasher.length, 'fillRatio =', featureHasher.fillRatio(), 
    'collisions =', featureHasher.collisions(), 'collisionRatio =', featureHasher.collisionRatio(), 
    'valueCounth =', featureHasher.valueCount());
```

## Tests

```shell
  npm test
```

## Release History

* 1.0.0 Initial release
