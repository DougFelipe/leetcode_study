/**
 * Longest Substring Without Repeating Characters - Kotlin Sliding Window
 * Time: O(n), Space: O(min(n, m))
 *
 * Uses Kotlin's mutableSetOf and maxOf for clean code.
 */
class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        val charSet = mutableSetOf<Char>()
        var left = 0
        var maxLen = 0

        for (right in s.indices) {
            // Shrink window until duplicate is removed
            while (s[right] in charSet) {
                charSet.remove(s[left])
                left++
            }

            // Add current character and update max
            charSet.add(s[right])
            maxLen = maxOf(maxLen, right - left + 1)
        }

        return maxLen
    }
}
