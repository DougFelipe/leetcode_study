/**
 * Subarray Sums Divisible by K - Scala Prefix Mod with foldLeft
 * Time: O(n), Space: O(k)
 *
 * Scala % can return negative — normalize with ((prefix % k) + k) % k.
 * Uses mutable Array for freq (foldLeft with mutable side-effects on array).
 */
object Solution {
  def subarraysDivByK(nums: Array[Int], k: Int): Int = {
    val freq = new Array[Int](k)
    freq(0) = 1

    nums.foldLeft((0, 0)) { case ((prefix, count), num) =>
      val newPrefix = ((prefix + num) % k + k) % k
      val found = freq(newPrefix)
      freq(newPrefix) += 1
      (newPrefix, count + found)
    }._2
  }
}
