# HashingTrick.js
Implements feature hashing, also known as the hashing trick, a fast and space-efficient way of vectorizing features. Converts tokenized strings in to a sparse feature vector.

## Installation

```shell
  npm install hashingtrick.js --save
```


## Usage

```js
  var featureHashing = require('hashingtrick.js');
  var featureHasher = featureHashing.newFeatureHasher(18); // Feature vector will be 2^18 elements

  var stringsToHash = ['hello', 'world'];
  
  // Hash n-grams
  stringsToHash.forEach(function(str){ featureHasher.add(str); });
  
  console.log('sparseFeatureVector =', featureHasher.sparseFeatureVector());
  
  console.log('Stats:');
  console.log('sparseLength =', featureHasher.sparseLength());
  console.log('length =', featureHasher.length());
  console.log('fillRatio =', featureHasher.fillRatio());
  console.log('collisions =', featureHasher.collisions());
  console.log('collisionRatio =', featureHasher.collisionRatio());
  console.log('valueCount =', featureHasher.valueCount());
  
  // -- Output --
  // sparseFeatureVector = { '13799': 1, '247186': 1 }
  // Stats:
  // sparseLength = 2
  // length = 262144
  // fillRatio = 131072
  // collisions = 0
  // collisionRatio = 0
  // valueCount = 2
```

## Tests

```shell
  npm test
```

## Release History

* 1.0.0 Initial release
