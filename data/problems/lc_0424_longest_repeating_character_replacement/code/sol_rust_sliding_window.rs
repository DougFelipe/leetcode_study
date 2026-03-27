impl Solution {
    /// Longest Repeating Character Replacement - Rust Sliding Window
    /// Time: O(n), Space: O(1)
    pub fn character_replacement(s: String, k: i32) -> i32 {
        let s = s.as_bytes();
        let mut freq = [0i32; 26];
        let mut left: usize = 0;
        let mut max_freq: i32 = 0;

        for right in 0..s.len() {
            let idx = (s[right] - b'A') as usize;
            freq[idx] += 1;
            max_freq = max_freq.max(freq[idx]);

            // If window is invalid, slide left by 1
            if (right - left + 1) as i32 - max_freq > k {
                freq[(s[left] - b'A') as usize] -= 1;
                left += 1;
            }
        }

        (s.len() - left) as i32
    }
}
