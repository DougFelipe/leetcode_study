/**
 * Longest Repeating Character Replacement - JavaScript Sliding Window
 * Time: O(n), Space: O(1)
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    const freq = new Array(26).fill(0);
    let left = 0;
    let maxFreq = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 65; // 'A' = 65
        freq[idx]++;
        maxFreq = Math.max(maxFreq, freq[idx]);

        if (right - left + 1 - maxFreq > k) {
            freq[s.charCodeAt(left) - 65]--;
            left++;
        }
    }

    return s.length - left;
};
