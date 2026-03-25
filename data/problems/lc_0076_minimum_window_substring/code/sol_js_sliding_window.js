/**
 * Minimum Window Substring - JavaScript Sliding Window
 * Time: O(m + n), Space: O(m + n)
 *
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (s.length < t.length) return "";

    const need = new Map();
    const window = new Map();

    for (const c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }

    const required = need.size;
    let have = 0;
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;

    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);

        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }

        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);
            if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};
