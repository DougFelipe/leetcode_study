/**
 * Median of Two Sorted Arrays - Scala Functional Binary Search Partition
 * Time: O(log(min(m, n))), Space: O(1)
 *
 * Uses tail recursion for the binary search loop.
 */
object Solution {
  def findMedianSortedArrays(nums1: Array[Int], nums2: Array[Int]): Double = {
    // Ensure a is the smaller array
    val (a, b) = if (nums1.length <= nums2.length) (nums1, nums2) else (nums2, nums1)
    val m = a.length
    val n = b.length

    def search(lo: Int, hi: Int): Double = {
      val partition1 = (lo + hi) / 2
      val partition2 = (m + n + 1) / 2 - partition1

      // Edge values with sentinels
      val maxLeft1 = if (partition1 == 0) Int.MinValue else a(partition1 - 1)
      val minRight1 = if (partition1 == m) Int.MaxValue else a(partition1)
      val maxLeft2 = if (partition2 == 0) Int.MinValue else b(partition2 - 1)
      val minRight2 = if (partition2 == n) Int.MaxValue else b(partition2)

      if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
        // Found correct partition
        if ((m + n) % 2 == 1) {
          math.max(maxLeft1, maxLeft2).toDouble
        } else {
          (math.max(maxLeft1, maxLeft2) + math.min(minRight1, minRight2)) / 2.0
        }
      } else if (maxLeft1 > minRight2) {
        search(lo, partition1 - 1)
      } else {
        search(partition1 + 1, hi)
      }
    }

    search(0, m)
  }
}
