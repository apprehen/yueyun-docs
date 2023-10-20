var trap = function(height) {
  // 接雨水
  // 按照O(n)写法
  // 求最大高度
  const n = height.length
  const maxHeight = Math.max(...height)
  let sum = 0
  let left = 0
  // 从左边依次遍历
  for (let i = 0; i < n; i++) {
    if (height[i] === maxHeight) {
      left = i
      break 
    }
  }
  let right = 0
  // 从右边依次遍历
  for (let i = n - 1; i >= 0; i--) {
    if (height[i] === maxHeight) {
      right = i
      break
    }
  }
  // 计算left和right之间的水滴
  for (let i = left + 1; i < right; i++) {
    sum+=maxHeight-height[i]
  }
  // 计算最左边到left的水滴
  let leftTemp = 0
  for (let i = 0; i < left; i++) {
    if (leftTemp > height[i]) {
      sum += leftTemp - height[i]
    } else {
      leftTemp = height[i]
    }
    // leftTemp = height[i]
  }
  let rightTemp = 0
  for (let i = n - 1; i > right; i--) {
    if (rightTemp > height[i]) {
      sum+=rightTemp-height[i]
    } else {
      rightTemp = height[i]
    }
  }
  return sum
};

console.log(trap([4,2,0,3,2,5]))