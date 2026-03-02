import scala.collection.mutable

/**
 * Longest Substring Without Repeating Characters - Scala Functional Sliding Window
 * Time: O(n), Space: O(min(n, m))
 *
 * Uses tail recursion for a functional approach.
 */
object Solution {
  def lengthOfLongestSubstring(s: String): Int = {
    val charSet = mutable.Set[Char]()
    var left = 0
    var maxLen = 0

    for (right <- s.indices) {
      // Shrink window until duplicate is removed
      while (charSet.contains(s(right))) {
        charSet.remove(s(left))
        left += 1
      }

      // Add current character and update max
      charSet.add(s(right))
      maxLen = math.max(maxLen, right - left + 1)
    }

    maxLen
  }
}
