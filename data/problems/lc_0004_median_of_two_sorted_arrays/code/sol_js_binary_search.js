/**
 * Median of Two Sorted Arrays - JavaScript Binary Search Partition
 * Time: O(log(min(m, n))), Space: O(1)
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    let lo = 0,
        hi = m;

    while (lo <= hi) {
        const partition1 = Math.floor((lo + hi) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;

        // Edge values with sentinels
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found correct partition
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeft1, maxLeft2);
            } else {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            }
        } else if (maxLeft1 > minRight2) {
            hi = partition1 - 1;
        } else {
            lo = partition1 + 1;
        }
    }

    throw new Error("Input arrays are not sorted");
};
