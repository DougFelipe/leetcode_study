/**
 * Longest Palindromic Substring - Kotlin Expand Around Center
 * Time: O(n²), Space: O(1)
 *
 * Uses nested function and Kotlin string slicing.
 */
class Solution {
    fun longestPalindrome(s: String): String {
        if (s.length < 2) return s

        var start = 0
        var maxLen = 1

        fun expand(l: Int, r: Int) {
            var left = l
            var right = r
            while (left >= 0 && right < s.length && s[left] == s[right]) {
                if (right - left + 1 > maxLen) {
                    start = left
                    maxLen = right - left + 1
                }
                left--
                right++
            }
        }

        for (i in s.indices) {
            expand(i, i)      // Odd-length palindromes
            expand(i, i + 1)  // Even-length palindromes
        }

        return s.substring(start, start + maxLen)
    }
}
