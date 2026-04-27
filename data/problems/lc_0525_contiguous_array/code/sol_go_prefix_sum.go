package main

// findMaxLength finds the longest subarray with equal 0s and 1s
// Time: O(n), Space: O(n)
// Transform: 0 -> -1. Equal 0s and 1s means subarray sum == 0.
func findMaxLength(nums []int) int {
	firstSeen := map[int]int{0: -1}
	prefix := 0
	maxLen := 0

	for i, num := range nums {
		if num == 1 {
			prefix++
		} else {
			prefix--
		}

		if idx, ok := firstSeen[prefix]; ok {
			if i-idx > maxLen {
				maxLen = i - idx
			}
		} else {
			firstSeen[prefix] = i
		}
	}

	return maxLen
}
