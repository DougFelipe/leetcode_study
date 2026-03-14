/**
 * 3Sum - JavaScript Sort + Two Pointers
 * Time: O(n²), Space: O(log n) for sort
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 2; i++) {
        // Early termination
        if (nums[i] > 0) break;
        // Skip duplicate fixed element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1,
            right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};
