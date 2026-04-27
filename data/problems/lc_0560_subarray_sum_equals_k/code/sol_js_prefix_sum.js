/**
 * Subarray Sum Equals K - JavaScript Prefix Sum + Map
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let prefix = 0;
    let count = 0;

    for (const num of nums) {
        prefix += num;
        count += prefixCount.get(prefix - k) || 0;
        prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
    }

    return count;
};
