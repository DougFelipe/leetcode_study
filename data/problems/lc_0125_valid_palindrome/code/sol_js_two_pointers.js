/**
 * Valid Palindrome - JavaScript Two Pointers
 * Time: O(n), Space: O(1)
 *
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    let left = 0,
        right = s.length - 1;

    const isAlnum = (c) => /[a-zA-Z0-9]/.test(c);

    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlnum(s[left])) {
            left++;
        }
        // Skip non-alphanumeric from right
        while (left < right && !isAlnum(s[right])) {
            right--;
        }

        // Compare lowercase characters
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};
