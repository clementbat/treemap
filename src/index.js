const {
  sumReducer,
  getMaximum,
  getMinimum,
  roundValue,
  validateArguments,
} = require('./helpers');

function worstRatio(row, width) {
  const sum = row.reduce(sumReducer, 0);
  const rowMax = getMaximum(row);
  const rowMin = getMinimum(row);
  return Math.max(((width ** 2) * rowMax) / (sum ** 2), (sum ** 2) / ((width ** 2) * rowMin));
}

function getMinWidth() {
  if (this.Rectangle.totalHeight ** 2 > this.Rectangle.totalWidth ** 2) {
    return { value: this.Rectangle.totalWidth, vertical: false };
  }
  return { value: this.Rectangle.totalHeight, vertical: true };
}

function layoutRow(row, width, vertical) {
  const rowHeight = row.reduce(sumReducer, 0) / width;

  row.forEach((rowItem) => {
    const rowWidth = rowItem / rowHeight;
    const { xBeginning } = this.Rectangle;
    const { yBeginning } = this.Rectangle;

    let data;
    if (vertical) {
      data = {
        x: xBeginning,
        y: yBeginning,
        width: rowHeight,
        height: rowWidth,
        data: this.initialData[this.Rectangle.data.length],
      };
      this.Rectangle.yBeginning += rowWidth;
    } else {
      data = {
        x: xBeginning,
        y: yBeginning,
        width: rowWidth,
        height: rowHeight,
        data: this.initialData[this.Rectangle.data.length],
      };
      this.Rectangle.xBeginning += rowWidth;
    }

    this.Rectangle.data.push(data);
  });

  if (vertical) {
    this.Rectangle.xBeginning += rowHeight;
    this.Rectangle.yBeginning -= width;
    this.Rectangle.totalWidth -= rowHeight;
  } else {
    this.Rectangle.xBeginning -= width;
    this.Rectangle.yBeginning += rowHeight;
    this.Rectangle.totalHeight -= rowHeight;
  }
}

function layoutLastRow(rows, children, width) {
  const { vertical } = getMinWidth();
  layoutRow(rows, width, vertical);
  layoutRow(children, width, vertical);
}

function squarify(children, row, width) {
  if (children.length === 1) {
    return layoutLastRow(row, children, width);
  }

  const rowWithChild = [...row, children[0]];

  if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
    children.shift();
    return squarify(children, rowWithChild, width);
  }
  layoutRow(row, width, getMinWidth().vertical);
  return squarify(children, [], getMinWidth().value);
}

exports.getTreemap = function getTreemap({ data, width, height }) {
  validateArguments({ data, width, height });
  this.Rectangle = {
    data: [],
    xBeginning: 0,
    yBeginning: 0,
    totalWidth: width,
    totalHeight: height,
  };
  this.initialData = data;
  const totalValue = data.map((dataPoint) => dataPoint.value).reduce(sumReducer, 0);
  const dataScaled = data.map((dataPoint) => (dataPoint.value * height * width) / totalValue);

  squarify(dataScaled, [], getMinWidth().value);
  return this.Rectangle.data.map((dataPoint) => ({
    ...dataPoint,
    x: roundValue(dataPoint.x),
    y: roundValue(dataPoint.y),
    width: roundValue(dataPoint.width),
    height: roundValue(dataPoint.height),
  }));
};
