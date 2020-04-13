const assert = require('assert');
const { getTreemap } = require('../src');

describe('treemap-squarify module', function () {
  describe('getTreemap main function', function () {
    it('should return an error if malformed height argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
        ],
        width: 700,
      });
      assert.throws(shouldThrow, Error('You need to specify the height of your treemap'));
    });

    it('should return an error if malformed height argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
        ],
        width: 700,
        height: '600',
      });
      assert.throws(shouldThrow, Error('You need to specify the height of your treemap'));
    });

    it('should return an error if malformed width argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
        ],
        height: 700,
      });
      assert.throws(shouldThrow, Error('You need to specify the width of your treemap'));
    });

    it('should return an error if malformed width argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
        ],
        width: '700',
        height: 600,
      });
      assert.throws(shouldThrow, Error('You need to specify the width of your treemap'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
          { value: -1 },
        ],
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
          { value: '1' },
        ],
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        data: [
          { value: 10 },
          1,
        ],
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        data: '[{ value: 10 }]',
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return an error if malformed data argument', function () {
      const shouldThrow = () => getTreemap({
        data: [],
        width: 700,
        height: 600,
      });
      assert.throws(shouldThrow, Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number'));
    });

    it('should return the result expected', function () {
      const result = [
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
      ];
      assert.deepEqual(getTreemap({
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
      }), result);
    });

    it('should return the result expected', function () {
      const result = [
        { x: 0,
          y: 0,
          width: 296.97,
          height: 257.14,
          data: { value: 6 },
        },
        {
          x: 0,
          y: 257.14,
          width: 296.97,
          height: 342.86,
          data: { value: 8 },
        },
        {
          x: 296.97,
          y: 0,
          width: 201.52,
          height: 315.79,
          data: { value: 5 },
        },
        {
          x: 498.48,
          y: 0,
          width: 201.52,
          height: 315.79,
          data: { value: 5 },
        },
        {
          x: 296.97,
          y: 315.79,
          width: 358.25,
          height: 284.21,
          data: { value: 8 },
        },
        {
          x: 655.22,
          y: 315.79,
          width: 44.78,
          height: 284.21,
          data: { value: 1 },
        }
      ];
      assert.deepEqual(getTreemap({
        data: [
          { value: 6 },
          { value: 8 },
          { value: 5 },
          { value: 5 },
          { value: 8 },
          { value: 1 },
        ],
        width: 700,
        height: 600,
      }), result);
    });

    it('should return the result with one data point', function () {
      const result = [
        {
          data: {
            value: 9,
          },
          height: 600,
          width: 700,
          x: 0,
          y: 0,
        },
      ];
      assert.deepEqual(getTreemap({
        data: [
          { value: 9 },
        ],
        width: 700,
        height: 600,
      }), result);
    });
  });
});
