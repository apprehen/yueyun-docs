var trap = function(height) {
  // 接雨水
  const n = height.length
  let sum = 0
  let max_left = new Array(n).fill(0)
  let max_right = new Array(n).fill(0)
  for (let i = 1; i < n - 1; i++) {
    max_left[i] = Math.max(max_left[i-1],height[i-1])
  }
  for (let i = n - 2; i >= 0; i--) {
    max_right[i] = Math.max(max_right[i+1],height[i+1])
  }
  for (let i = 1; i < n-1; i++) {
    // if(max_left[i]>height)
    let min = Math.min(max_left[i], max_right[i])
    if (min > height[i]) {
      sum += min-height[i]
    }
  }
  return sum
};

console.log(trap([4,2,0,3,2,5]))