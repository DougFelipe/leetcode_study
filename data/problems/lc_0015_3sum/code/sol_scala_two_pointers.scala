import scala.collection.mutable.ListBuffer

/**
 * 3Sum - Scala Sort + Two Pointers
 * Time: O(n²), Space: O(log n) for sort
 *
 * Uses sorted array with two-pointer technique.
 */
object Solution {
  def threeSum(nums: Array[Int]): List[List[Int]] = {
    val sorted = nums.sorted
    val result = ListBuffer[List[Int]]()
    val n = sorted.length

    for (i <- 0 until n - 2) {
      // Early termination
      if (sorted(i) > 0) return result.toList
      // Skip duplicate fixed element
      if (i > 0 && sorted(i) == sorted(i - 1)) {
        // skip
      } else {
        var left = i + 1
        var right = n - 1
        while (left < right) {
          val sum = sorted(i) + sorted(left) + sorted(right)
          if (sum == 0) {
            result += List(sorted(i), sorted(left), sorted(right))
            // Skip duplicates
            while (left < right && sorted(left) == sorted(left + 1)) left += 1
            while (left < right && sorted(right) == sorted(right - 1)) right -= 1
            left += 1
            right -= 1
          } else if (sum < 0) {
            left += 1
          } else {
            right -= 1
          }
        }
      }
    }

    result.toList
  }
}
