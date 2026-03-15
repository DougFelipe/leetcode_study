/**
 * Valid Palindrome - Kotlin Two Pointers
 * Time: O(n), Space: O(1)
 *
 * Uses Kotlin's isLetterOrDigit() and lowercaseChar() extension functions.
 */
class Solution {
    fun isPalindrome(s: String): Boolean {
        var left = 0
        var right = s.length - 1

        while (left < right) {
            // Skip non-alphanumeric from left
            while (left < right && !s[left].isLetterOrDigit()) {
                left++
            }
            // Skip non-alphanumeric from right
            while (left < right && !s[right].isLetterOrDigit()) {
                right--
            }

            // Compare lowercase characters
            if (s[left].lowercaseChar() != s[right].lowercaseChar()) {
                return false
            }

            left++
            right--
        }

        return true
    }
}
