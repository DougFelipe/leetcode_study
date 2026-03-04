package main

import "math"

// findMedianSortedArrays finds the median of two sorted arrays using binary search partition
// Time: O(log(min(m, n))), Space: O(1)
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	// Ensure nums1 is the smaller array
	if len(nums1) > len(nums2) {
		nums1, nums2 = nums2, nums1
	}

	m, n := len(nums1), len(nums2)
	lo, hi := 0, m

	for lo <= hi {
		partition1 := (lo + hi) / 2
		partition2 := (m + n + 1) / 2 - partition1

		// Edge values with sentinels
		maxLeft1 := math.MinInt64
		if partition1 > 0 {
			maxLeft1 = nums1[partition1-1]
		}
		minRight1 := math.MaxInt64
		if partition1 < m {
			minRight1 = nums1[partition1]
		}
		maxLeft2 := math.MinInt64
		if partition2 > 0 {
			maxLeft2 = nums2[partition2-1]
		}
		minRight2 := math.MaxInt64
		if partition2 < n {
			minRight2 = nums2[partition2]
		}

		if maxLeft1 <= minRight2 && maxLeft2 <= minRight1 {
			// Found correct partition
			if (m+n)%2 == 1 {
				return float64(max(maxLeft1, maxLeft2))
			}
			return float64(max(maxLeft1, maxLeft2)+min(minRight1, minRight2)) / 2.0
		} else if maxLeft1 > minRight2 {
			hi = partition1 - 1
		} else {
			lo = partition1 + 1
		}
	}

	return 0.0 // Should never reach here with valid input
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
