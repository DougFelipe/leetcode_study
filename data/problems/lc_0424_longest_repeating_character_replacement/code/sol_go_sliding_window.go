package main

// characterReplacement finds the longest substring with same letter after at most k replacements
// Time: O(n), Space: O(1)
func characterReplacement(s string, k int) int {
	var freq [26]int
	left := 0
	maxFreq := 0

	for right := 0; right < len(s); right++ {
		idx := s[right] - 'A'
		freq[idx]++
		if freq[idx] > maxFreq {
			maxFreq = freq[idx]
		}

		// If window is invalid, slide left by 1
		if (right - left + 1) - maxFreq > k {
			freq[s[left]-'A']--
			left++
		}
	}

	return len(s) - left
}
