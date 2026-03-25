package main

// minWindow finds the minimum window substring of s containing all chars of t
// Time: O(m + n), Space: O(m + n)
func minWindow(s string, t string) string {
	if len(s) < len(t) {
		return ""
	}

	need := make(map[byte]int)
	window := make(map[byte]int)

	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}

	required := len(need)
	have := 0
	left := 0
	minLen := len(s) + 1
	minStart := 0

	for right := 0; right < len(s); right++ {
		c := s[right]
		window[c]++

		if need[c] > 0 && window[c] == need[c] {
			have++
		}

		for have == required {
			if right-left+1 < minLen {
				minLen = right - left + 1
				minStart = left
			}

			leftChar := s[left]
			window[leftChar]--
			if need[leftChar] > 0 && window[leftChar] < need[leftChar] {
				have--
			}
			left++
		}
	}

	if minLen > len(s) {
		return ""
	}
	return s[minStart : minStart+minLen]
}
