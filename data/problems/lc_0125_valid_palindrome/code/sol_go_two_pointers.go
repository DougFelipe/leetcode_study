package main

import "unicode"

// isPalindrome checks if a string is a valid palindrome (alphanumeric, case-insensitive)
// Time: O(n), Space: O(1)
func isPalindrome(s string) bool {
	left, right := 0, len(s)-1

	for left < right {
		// Skip non-alphanumeric from left
		for left < right && !isAlnum(s[left]) {
			left++
		}
		// Skip non-alphanumeric from right
		for left < right && !isAlnum(s[right]) {
			right--
		}

		// Compare lowercase characters
		if toLower(s[left]) != toLower(s[right]) {
			return false
		}

		left++
		right--
	}

	return true
}

func isAlnum(c byte) bool {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
}

func toLower(c byte) byte {
	if c >= 'A' && c <= 'Z' {
		return c + ('a' - 'A')
	}
	return c
}
