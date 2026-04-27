/**
 * Contiguous Array - JavaScript Prefix Sum + First Occurrence Map
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    const firstSeen = new Map([[0, -1]]);
    let prefix = 0;
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        prefix += nums[i] === 1 ? 1 : -1;

        if (firstSeen.has(prefix)) {
            maxLen = Math.max(maxLen, i - firstSeen.get(prefix));
        } else {
            firstSeen.set(prefix, i);
        }
    }

    return maxLen;
};
