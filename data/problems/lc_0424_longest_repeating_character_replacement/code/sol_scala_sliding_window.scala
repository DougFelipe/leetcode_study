/**
 * Longest Repeating Character Replacement - Scala Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Uses Array(26) for frequency tracking. maxFreq never decreases.
 */
object Solution {
  def characterReplacement(s: String, k: Int): Int = {
    val freq = new Array[Int](26)
    var left = 0
    var maxFreq = 0

    for (right <- s.indices) {
      val idx = s(right) - 'A'
      freq(idx) += 1
      maxFreq = math.max(maxFreq, freq(idx))

      if ((right - left + 1) - maxFreq > k) {
        freq(s(left) - 'A') -= 1
        left += 1
      }
    }

    s.length - left
  }
}
