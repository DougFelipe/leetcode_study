/**
 * Longest Palindromic Substring - Scala Functional Expand Around Center
 * Time: O(n²), Space: O(1)
 *
 * Uses a recursive expand helper for functional style.
 */
object Solution {
  def longestPalindrome(s: String): String = {
    if (s.length < 2) return s

    var start = 0
    var maxLen = 1

    def expand(left: Int, right: Int): Unit = {
      if (left >= 0 && right < s.length && s(left) == s(right)) {
        if (right - left + 1 > maxLen) {
          start = left
          maxLen = right - left + 1
        }
        expand(left - 1, right + 1)
      }
    }

    for (i <- s.indices) {
      expand(i, i)      // Odd-length palindromes
      expand(i, i + 1)  // Even-length palindromes
    }

    s.substring(start, start + maxLen)
  }
}
