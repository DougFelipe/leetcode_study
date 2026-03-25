import scala.collection.mutable.ListBuffer

/**
 * 3Sum - Scala Sort + Two Pointers (Optimized)
 * Time: O(n²), Space: O(log n) for sort
 *
 * Improvements:
 * - Removed non-local return (Scala 3 safe)
 * - Loop guard for early termination
 * - Cleaner duplicate handling
 *
 * Uses sorted array with two-pointer technique.
 */
object Solution {
  def threeSum(nums: Array[Int]): List[List[Int]] = {
    val sorted = nums.sorted
    val result = ListBuffer[List[Int]]()
    val n = sorted.length

    // Iterate only while sorted(i) <= 0 (early termination)
    for (i <- 0 until n - 2 if sorted(i) <= 0) {

      // Skip duplicate fixed element
      if (i == 0 || sorted(i) != sorted(i - 1)) {

        var left = i + 1
        var right = n - 1

        while (left < right) {
          val sum = sorted(i) + sorted(left) + sorted(right)

          if (sum == 0) {
            result += List(sorted(i), sorted(left), sorted(right))

            // Skip duplicates for left and right
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