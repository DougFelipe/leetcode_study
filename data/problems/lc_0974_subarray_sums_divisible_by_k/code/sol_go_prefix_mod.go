package main

// subarraysDivByK counts subarrays with sum divisible by k
// Time: O(n), Space: O(k)
// Go % can return negative — must normalize: ((prefix % k) + k) % k
func subarraysDivByK(nums []int, k int) int {
	freq := make([]int, k)
	freq[0] = 1
	prefix := 0
	count := 0

	for _, num := range nums {
		prefix = ((prefix+num)%k + k) % k // Normalize negative remainder
		count += freq[prefix]
		freq[prefix]++
	}

	return count
}
