/**
 * Longest Substring Without Repeating Characters - JavaScript Sliding Window
 * Time: O(n), Space: O(min(n, m))
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const charSet = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Shrink window until duplicate is removed
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }

        // Add current character and update max
        charSet.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
