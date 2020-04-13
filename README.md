# Treemap squarify
Treemap squarify is calculating coordinates of a treemap representation following the "squarify" algorithm.

# Install

```
npm install treemap-squarify
```

# Usage

```
const { getTreemap } = require('treemap-squarify');

const result = getTreemap({
  data: [ // your dataset
    { value: 10 },
    { value: 7 },
    { value: 4 },
    { value: 1 },
    { value: 5 },
    { value: 9 },
   ],
  width: 700, // the width and height of your treemap
  height: 600,
});
```

You can pass along properties with the data, they will be in the response object. For example a specific color for each data point:

```
const { getTreemap } = require('treemap-squarify');

const result = getTreemap({
  data: [
    { value: 10, color: 'red' },
    { value: 7, color: 'black' },
    { value: 4, color: 'blue' },
    { value: 1, color: 'white' },
    { value: 5, color: 'green' },
    { value: 9, color: 'grey' },
   ],
  width: 700,
  height: 600,
});
```

Result will be 
```
[
    {
      x: 0,
      y: 0,
      width: 330.56,
      height: 352.94,
      data: { value: 10, color: 'red' },
    },
    {
      x: 0,
      y: 352.94,
      width: 330.56,
      height: 247.06,
      data: { value: 7, color: 'black' },
    },
    {
      x: 330.56,
      y: 0,
      width: 295.56,
      height: 157.89,
      data: { value: 4, color: 'blue' },
    },
    {
      x: 626.11,
      y: 0,
      width: 73.89,
      height: 157.89,
      data: { value: 1, color: 'white' },
    },
    {
      x: 330.56,
      y: 157.89,
      width: 369.44,
      height: 157.89,
      data: { value: 5, color: 'green' },
    },
    {
      x: 330.56,
      y: 315.79,
      width: 369.44,
      height: 284.21,
      data: { value: 9, color: 'grey' },
    },
]
```

All coordinates are rounded with 2 decimals.

# Licensing

The code in this project is licensed under MIT license.
