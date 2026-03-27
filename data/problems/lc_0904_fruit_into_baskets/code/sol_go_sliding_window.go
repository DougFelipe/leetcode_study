package main

// totalFruit finds the longest subarray with at most 2 distinct elements
// Time: O(n), Space: O(1)
func totalFruit(fruits []int) int {
	basket := make(map[int]int)
	left := 0
	maxLen := 0

	for right := 0; right < len(fruits); right++ {
		basket[fruits[right]]++

		for len(basket) > 2 {
			basket[fruits[left]]--
			if basket[fruits[left]] == 0 {
				delete(basket, fruits[left])
			}
			left++
		}

		if right-left+1 > maxLen {
			maxLen = right - left + 1
		}
	}

	return maxLen
}
