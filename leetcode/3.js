// 按列求
  var trap = function (height) {
    const n = height.length
    let sum = 0
    // 两端的不考虑
    for (let i = 1; i < n-1; i++) {
      // 求每列的雨水
      // 找出左边最高的列
      let leftHeight = getMax(height, 0, i-1 )
      let rightHeight = getMax(height,i+1,n-1)
      // if(leftHeight)
      const minHegiht = Math.min(leftHeight, rightHeight)
      if (minHegiht > height[i]) {
        sum += minHegiht - height[i]
      }
    }
    return sum
  };

  function getMax(n,minLength,maxLength) {
    // for()
    let maxNum = 0
    console.log(n,minLength,maxLength)
    for (let i = minLength; i <= maxLength; i++) {
      if (maxNum < n[i]) {
        maxNum = n[i]
      }
    }
    return maxNum
  }

console.log(trap([4,2,0,3,2,5]))