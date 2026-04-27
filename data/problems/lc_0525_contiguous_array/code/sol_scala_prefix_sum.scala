/**
 * Contiguous Array - Scala Prefix Sum with foldLeft
 * Time: O(n), Space: O(n)
 *
 * foldLeft accumulates (prefix, maxLen, firstSeen map).
 * Only insert to map when prefix not yet seen.
 */
object Solution {
  def findMaxLength(nums: Array[Int]): Int = {
    val init = (0, 0, Map(0 -> -1))

    val (_, maxLen, _) = nums.zipWithIndex.foldLeft(init) {
      case ((prefix, maxLen, firstSeen), (num, i)) =>
        val newPrefix = prefix + (if (num == 1) 1 else -1)
        if (firstSeen.contains(newPrefix)) {
          val len = i - firstSeen(newPrefix)
          (newPrefix, math.max(maxLen, len), firstSeen)
        } else {
          (newPrefix, maxLen, firstSeen + (newPrefix -> i))
        }
    }

    maxLen
  }
}
