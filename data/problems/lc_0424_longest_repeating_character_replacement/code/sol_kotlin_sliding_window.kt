/**
 * Longest Repeating Character Replacement - Kotlin Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Uses IntArray(26) for frequency. maxFreq never decreases.
 */
class Solution {
    fun characterReplacement(s: String, k: Int): Int {
        val freq = IntArray(26)
        var left = 0
        var maxFreq = 0

        for (right in s.indices) {
            val idx = s[right] - 'A'
            freq[idx]++
            maxFreq = maxOf(maxFreq, freq[idx])

            if ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--
                left++
            }
        }

        return s.length - left
    }
}
