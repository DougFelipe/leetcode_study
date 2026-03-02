use std::collections::HashSet;

impl Solution {
    /// Longest Substring Without Repeating Characters - Rust Sliding Window
    /// Time: O(n), Space: O(min(n, m))
    pub fn length_of_longest_substring(s: String) -> i32 {
        let s = s.as_bytes();
        let mut char_set = HashSet::new();
        let mut left = 0;
        let mut max_len = 0;

        for right in 0..s.len() {
            // Shrink window until duplicate is removed
            while char_set.contains(&s[right]) {
                char_set.remove(&s[left]);
                left += 1;
            }

            // Add current character and update max
            char_set.insert(s[right]);
            max_len = max_len.max(right - left + 1);
        }

        max_len as i32
    }
}
