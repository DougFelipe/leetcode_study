impl Solution {
    /// Valid Palindrome - Rust Two Pointers
    /// Time: O(n), Space: O(1)
    pub fn is_palindrome(s: String) -> bool {
        let s = s.as_bytes();
        let mut left: usize = 0;
        let mut right: usize = s.len().saturating_sub(1);

        while left < right {
            // Skip non-alphanumeric from left
            while left < right && !s[left].is_ascii_alphanumeric() {
                left += 1;
            }
            // Skip non-alphanumeric from right
            while left < right && !s[right].is_ascii_alphanumeric() {
                right -= 1;
            }

            // Compare lowercase characters
            if s[left].to_ascii_lowercase() != s[right].to_ascii_lowercase() {
                return false;
            }

            left += 1;
            right = right.saturating_sub(1);
        }

        true
    }
}
