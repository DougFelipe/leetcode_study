package main

// twoSum finds two indices in nums that sum to target
// Time: O(n), Space: O(n)
func twoSum(nums []int, target int) []int {
	// Create hash map to store value -> index mapping
	seen := make(map[int]int)

	// Iterate through array with indices
	for i, num := range nums {
		// Calculate what number we need to find
		complement := target - num

		// Check if complement exists in our map
		if idx, found := seen[complement]; found {
			// Found it! Return both indices
			return []int{idx, i}
		}

		// Store current number and its index for future lookups
		seen[num] = i
	}

	// No solution found (problem guarantees this won't happen)
	return []int{}
}
