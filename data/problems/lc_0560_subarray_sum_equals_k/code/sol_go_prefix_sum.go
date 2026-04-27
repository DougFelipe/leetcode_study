package main

// subarraySum counts subarrays with sum equal to k using prefix sum + hash map
// Time: O(n), Space: O(n)
func subarraySum(nums []int, k int) int {
	prefixCount := map[int]int{0: 1}
	prefix := 0
	count := 0

	for _, num := range nums {
		prefix += num
		count += prefixCount[prefix-k] // zero value if not present
		prefixCount[prefix]++
	}

	return count
}
