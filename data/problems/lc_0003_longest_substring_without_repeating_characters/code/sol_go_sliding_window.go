package main

// lengthOfLongestSubstring finds the length of the longest substring without repeating characters
// Time: O(n), Space: O(min(n, m))
func lengthOfLongestSubstring(s string) int {
	charSet := make(map[byte]bool)
	left := 0
	maxLen := 0

	for right := 0; right < len(s); right++ {
		// Shrink window until duplicate is removed
		for charSet[s[right]] {
			delete(charSet, s[left])
			left++
		}

		// Add current character and update max
		charSet[s[right]] = true
		if right-left+1 > maxLen {
			maxLen = right - left + 1
		}
	}

	return maxLen
}
