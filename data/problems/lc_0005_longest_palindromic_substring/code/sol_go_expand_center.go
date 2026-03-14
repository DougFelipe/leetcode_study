package main

// longestPalindrome finds the longest palindromic substring using expand around center
// Time: O(n²), Space: O(1)
func longestPalindrome(s string) string {
	if len(s) < 2 {
		return s
	}

	start := 0
	maxLen := 1

	expand := func(left, right int) {
		for left >= 0 && right < len(s) && s[left] == s[right] {
			if right-left+1 > maxLen {
				start = left
				maxLen = right - left + 1
			}
			left--
			right++
		}
	}

	for i := 0; i < len(s); i++ {
		expand(i, i)   // Odd-length palindromes
		expand(i, i+1) // Even-length palindromes
	}

	return s[start : start+maxLen]
}
