/**
 * Subarray Sum Equals K - Scala Prefix Sum with foldLeft
 * Time: O(n), Space: O(n)
 *
 * Functional approach using foldLeft, accumulating (prefix, count, map) as state.
 */
object Solution {
  def subarraySum(nums: Array[Int], k: Int): Int = {
    val init = (0, 0, Map(0 -> 1))

    val (_, count, _) = nums.foldLeft(init) { case ((prefix, count, map), num) =>
      val newPrefix = prefix + num
      val found = map.getOrElse(newPrefix - k, 0)
      val newMap = map.updated(newPrefix, map.getOrElse(newPrefix, 0) + 1)
      (newPrefix, count + found, newMap)
    }

    count
  }
}
