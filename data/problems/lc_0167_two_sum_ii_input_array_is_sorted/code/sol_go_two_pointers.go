package main

// twoSum finds two numbers in a sorted array that add up to target
// Time: O(n), Space: O(1)
func twoSum(numbers []int, target int) []int {
	left, right := 0, len(numbers)-1

	for left < right {
		sum := numbers[left] + numbers[right]
		if sum == target {
			return []int{left + 1, right + 1} // 1-indexed
		} else if sum < target {
			left++
		} else {
			right--
		}
	}

	return []int{} // Should never reach here
}
