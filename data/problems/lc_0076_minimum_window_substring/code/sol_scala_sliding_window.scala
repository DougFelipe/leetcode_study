import scala.collection.mutable

/**
 * Minimum Window Substring - Scala Sliding Window
 * Time: O(m + n), Space: O(m + n)
 *
 * Uses mutable maps for frequency tracking with imperative sliding window.
 */
object Solution {
  def minWindow(s: String, t: String): String = {
    if (s.length < t.length) return ""

    val need = mutable.Map[Char, Int]().withDefaultValue(0)
    val window = mutable.Map[Char, Int]().withDefaultValue(0)

    for (c <- t) need(c) += 1

    val required = need.size
    var have = 0
    var left = 0
    var minLen = Int.MaxValue
    var minStart = 0

    for (right <- s.indices) {
      val c = s(right)
      window(c) += 1

      if (need.contains(c) && window(c) == need(c)) {
        have += 1
      }

      while (have == required) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1
          minStart = left
        }

        val leftChar = s(left)
        window(leftChar) -= 1
        if (need.contains(leftChar) && window(leftChar) < need(leftChar)) {
          have -= 1
        }
        left += 1
      }
    }

    if (minLen == Int.MaxValue) "" else s.substring(minStart, minStart + minLen)
  }
}
