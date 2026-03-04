/**
 * Median of Two Sorted Arrays - Kotlin Binary Search Partition
 * Time: O(log(min(m, n))), Space: O(1)
 *
 * Uses Kotlin's maxOf/minOf and when expression for clean code.
 */
class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        // Ensure nums1 is the smaller array
        var a = nums1
        var b = nums2
        if (a.size > b.size) {
            a = nums2
            b = nums1
        }

        val m = a.size
        val n = b.size
        var lo = 0
        var hi = m

        while (lo <= hi) {
            val partition1 = (lo + hi) / 2
            val partition2 = (m + n + 1) / 2 - partition1

            // Edge values with sentinels
            val maxLeft1 = if (partition1 == 0) Int.MIN_VALUE else a[partition1 - 1]
            val minRight1 = if (partition1 == m) Int.MAX_VALUE else a[partition1]
            val maxLeft2 = if (partition2 == 0) Int.MIN_VALUE else b[partition2 - 1]
            val minRight2 = if (partition2 == n) Int.MAX_VALUE else b[partition2]

            when {
                maxLeft1 <= minRight2 && maxLeft2 <= minRight1 -> {
                    // Found correct partition
                    return if ((m + n) % 2 == 1) {
                        maxOf(maxLeft1, maxLeft2).toDouble()
                    } else {
                        (maxOf(maxLeft1, maxLeft2) + minOf(minRight1, minRight2)) / 2.0
                    }
                }
                maxLeft1 > minRight2 -> hi = partition1 - 1
                else -> lo = partition1 + 1
            }
        }

        throw IllegalArgumentException("Input arrays are not sorted")
    }
}
