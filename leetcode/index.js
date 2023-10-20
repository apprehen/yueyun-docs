// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// const threeSumClosest = function(nums, target) {
//     nums = nums.sort((a, b) => a - b) 
//     const n = nums.length
//     let ans = nums[0]+nums[1]+nums[2]
//     for (let i = 0; i < n - 1; i++) {
//         const iNum = nums[i]
//         if (i > 1 && iNum === nums[i - 1]) continue
//         let l = i + 1
//         let r = n - 1
//         while (l < r) {
//             const lNum = nums[l]
//             const rNum = nums[r]
//             let sum = iNum + lNum + rNum
//             if (Math.abs(target - sum) < Math.abs(target-ans)) {
//                 ans = sum
//             }
//             if (sum < target) {
//                 l++
//             } else if (sum > target) {
//                 r--
//             } else {
//                 return ans
//             }
//         } 
//     }
//     return ans
// };

// /**
//  * @param {number} n
//  * @return {number}
//  */
// var sumOfMultiples = function(n) {
//     return f(n, 3) + f(n, 5) + f(n, 7) - f(n, 3 * 5) - f(n, 3 * 7) - f(n, 5 * 7) + f(n, 3 * 5 * 7)
// };

// /**
//  * @param {number} n 
//  * @param {number} m
// */
// function f(n, m) {
//     const y = parseInt(n/m)
//     return (m + y * m) * y/2
// }

// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var longestConsecutive = function(nums) {
//     let sum = 0
//     nums = nums.sort((a,b)=>a-b)
//     const hashTable = {}
//     for (let i = 0; i < nums.length; i++) {
//         if (hashTable[nums[i]-1]!==undefined) {
//             hashTable[nums[i]] = hashTable[nums[i] - 1] + 1
//         } else {
//             hashTable[nums[i]] = 1
//         }
//     }
//     for(const item of Object.values(hashTable) ) {
//         // console.log(item)
//         if (sum < item) {
//             sum = item
//         }
//     }
//     return sum
// };

// longestConsecutive([100,4,200,1,3,2])


// function equl(a,b) {
//     if (a.length != b.length) return false
//     const c = a + b
//     const hashTable = {}
//     for (let i = 0; i < c.length; i++) {
//       if (hashTable[c[i]] == undefined) {
//         hashTable[c[i]] = 1
//       } else {
//         hashTable[c[i]]++
//       }
//     }
//     for (const item of Object.values(hashTable)) {
//       if(item%2 != 0) return false
//     }
//     return true
//   }

//   /**
//    * @param {string[]} strs
//    * @return {string[][]}
//    */
//   var groupAnagrams = function (strs) {
//     const hashTable = {}
//     for (let str of strs) {
//       const array = Array.from(str).sort()
//       const key = array.join('')
//       if (hashTable[key] != undefined) {
//         hashTable[key].push(str)
//       } else {
//         hashTable[key] = [str]
//     }
//     }
//     return Array.from(Object.values(hashTable))
//   };

//   console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
// /**
//  * @param {number[]} height
//  * @return {number}
//  */
// var trap = function(height) {
//     // 接雨水
//     // 按照每层来计算的话
//     let sum = 0
//     const maxHeight = Math.max(...height)
//     for (let i = 1; i <= maxHeight; i++) {
//         let isStart = false
//         let tem_sum = 0
//         for (let j = 0; j < height.length; j++) {
//             // 第一层
//             if (isStart && height[j] < i) {
//                 tem_sum++
//             } 
//             if (height[j] >= i) {
//                 sum += tem_sum
//                 tem_sum = 0
//                 isStart = true
//             }
//         }
//     }
//     return sum
// };

// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function(s) {
//     // 遍历s 
//     if(s.length == 1) return s[0]
//     const n = s.length
//     const hashTable = {}
//     for (let i = 0; i < s.length; i++) {
//         let r = n - 1
//         // 找到与i相同的
//         while (r>=i) {
//             if (s[r] === s[i]) {
//                 // break
//                 if (s.slice(i, r+1) == s.slice(i, r+1).split('').reverse().join('')) {
//                     hashTable[s.slice(i, r + 1)] = r - i
//                     break
//                 }
//             } 
//             r--
//         }        
//     }
//     const max = Math.max(...Object.values(hashTable))
//     console.log(hashTable)
//     for (let i in hashTable) {
//         if (hashTable[i] == max) {
//             return i
//         }
//     }
// };

// console.log(longestPalindrome('aacabdkacaa'))


// leetcode 1726
/**
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function(nums) {
    nums = nums.sort((a, b) => a - b)
    let sum = 0
    const hashTable = {}
    if (nums.length < 4) return sum
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if (hashTable[nums[i] * nums[j]] != undefined) {
                hashTable[nums[i] * nums[j]]++
                
            } else {
                hashTable[nums[i] * nums[j]] = 1
            }
        }
    }
    console.log(hashTable)
    for (const item of Object.values(hashTable)) {
        if (item >= 2) {
            sum += item * (item - 1) * 4
        }
    }
    return sum
};

// tupleSameProduct([2, 3, 4, 6, 8, 12])
/**
 * [2,3,4,6] * 4
 * [2,12,4,6] * 4
 * 
 * */ 

// leetcode 2525
// /**
//  * @param {number} length
//  * @param {number} width
//  * @param {number} height
//  * @param {number} mass
//  * @return {string}
//  */
// var categorizeBox = function(length, width, height, mass) {
//     const tiji = length * width * height < 1000000000
//     const max = Math.max(length, width, height) < 10000
//     console.log(tiji, max)
//     if (mass < 100) {
//         if (tiji && max) {
//             return 'Neither'
//         } else {
//             return 'Bulky'
//         }
//     } else {
//         if (tiji && max) {
//             return 'Heavy'
//         } else {
//             return 'Both'
//         }
//     }
// };
