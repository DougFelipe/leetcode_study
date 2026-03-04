impl Solution {
    /// Median of Two Sorted Arrays - Rust Binary Search Partition
    /// Time: O(log(min(m, n))), Space: O(1)
    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        // Ensure a is the smaller array
        let (a, b) = if nums1.len() <= nums2.len() {
            (&nums1, &nums2)
        } else {
            (&nums2, &nums1)
        };

        let m = a.len();
        let n = b.len();
        let mut lo: usize = 0;
        let mut hi: usize = m;

        while lo <= hi {
            let partition1 = (lo + hi) / 2;
            let partition2 = (m + n + 1) / 2 - partition1;

            // Edge values with sentinels
            let max_left1 = if partition1 == 0 { i32::MIN } else { a[partition1 - 1] };
            let min_right1 = if partition1 == m { i32::MAX } else { a[partition1] };
            let max_left2 = if partition2 == 0 { i32::MIN } else { b[partition2 - 1] };
            let min_right2 = if partition2 == n { i32::MAX } else { b[partition2] };

            if max_left1 <= min_right2 && max_left2 <= min_right1 {
                // Found correct partition
                if (m + n) % 2 == 1 {
                    return max_left1.max(max_left2) as f64;
                } else {
                    return (max_left1.max(max_left2) + min_right1.min(min_right2)) as f64 / 2.0;
                }
            } else if max_left1 > min_right2 {
                hi = partition1 - 1;
            } else {
                lo = partition1 + 1;
            }
        }

        0.0 // Should never reach here with valid input
    }
}
