/**
 * Minimum Window Substring - Kotlin Sliding Window
 * Time: O(m + n), Space: O(m + n)
 *
 * Uses mutableMapOf and getOrDefault for clean frequency tracking.
 */
class Solution {
    fun minWindow(s: String, t: String): String {
        if (s.length < t.length) return ""

        val need = mutableMapOf<Char, Int>()
        val window = mutableMapOf<Char, Int>()

        for (c in t) {
            need[c] = need.getOrDefault(c, 0) + 1
        }

        val required = need.size
        var have = 0
        var left = 0
        var minLen = Int.MAX_VALUE
        var minStart = 0

        for (right in s.indices) {
            val c = s[right]
            window[c] = window.getOrDefault(c, 0) + 1

            if (c in need && window[c] == need[c]) {
                have++
            }

            while (have == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1
                    minStart = left
                }

                val leftChar = s[left]
                window[leftChar] = window[leftChar]!! - 1
                if (leftChar in need && window[leftChar]!! < need[leftChar]!!) {
                    have--
                }
                left++
            }
        }

        return if (minLen == Int.MAX_VALUE) "" else s.substring(minStart, minStart + minLen)
    }
}
