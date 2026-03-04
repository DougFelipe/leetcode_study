/**
 * Median of Two Sorted Arrays - Java OOP Binary Search Partition
 * Time: O(log(min(m, n))), Space: O(1)
 */
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Ensure nums1 is the smaller array
        if (nums1.length > nums2.length) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        int m = nums1.length;
        int n = nums2.length;
        int lo = 0, hi = m;

        while (lo <= hi) {
            int partition1 = (lo + hi) / 2;
            int partition2 = (m + n + 1) / 2 - partition1;

            // Edge values with sentinels
            int maxLeft1 = (partition1 == 0) ? Integer.MIN_VALUE : nums1[partition1 - 1];
            int minRight1 = (partition1 == m) ? Integer.MAX_VALUE : nums1[partition1];
            int maxLeft2 = (partition2 == 0) ? Integer.MIN_VALUE : nums2[partition2 - 1];
            int minRight2 = (partition2 == n) ? Integer.MAX_VALUE : nums2[partition2];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                // Found correct partition
                if ((m + n) % 2 == 1) {
                    return Math.max(maxLeft1, maxLeft2);
                } else {
                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
                }
            } else if (maxLeft1 > minRight2) {
                hi = partition1 - 1;
            } else {
                lo = partition1 + 1;
            }
        }

        throw new IllegalArgumentException("Input arrays are not sorted");
    }
}
