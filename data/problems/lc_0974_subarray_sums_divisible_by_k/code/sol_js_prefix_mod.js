/**
 * Subarray Sums Divisible by K - JavaScript Prefix Mod + Array
 * Time: O(n), Space: O(k)
 *
 * JS % can return negative — normalize with ((prefix % k) + k) % k.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
    const freq = new Array(k).fill(0);
    freq[0] = 1;
    let prefix = 0;
    let count = 0;

    for (const num of nums) {
        prefix = ((prefix + num) % k + k) % k; // Normalize negative
        count += freq[prefix];
        freq[prefix]++;
    }

    return count;
};
