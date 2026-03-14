/**
 * Longest Palindromic Substring - JavaScript Expand Around Center
 * Time: O(n²), Space: O(1)
 *
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s;

    let start = 0;
    let maxLen = 1;

    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expand(i, i);      // Odd-length palindromes
        expand(i, i + 1);  // Even-length palindromes
    }

    return s.substring(start, start + maxLen);
};
