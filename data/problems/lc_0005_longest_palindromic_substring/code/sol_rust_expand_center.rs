impl Solution {
    /// Longest Palindromic Substring - Rust Expand Around Center
    /// Time: O(n²), Space: O(1)
    pub fn longest_palindrome(s: String) -> String {
        let s = s.as_bytes();
        if s.len() < 2 {
            return String::from_utf8(s.to_vec()).unwrap();
        }

        let mut start = 0;
        let mut max_len = 1;

        let expand = |left: i32, right: i32, start: &mut usize, max_len: &mut usize| {
            let mut l = left;
            let mut r = right;
            while l >= 0 && (r as usize) < s.len() && s[l as usize] == s[r as usize] {
                let len = (r - l + 1) as usize;
                if len > *max_len {
                    *start = l as usize;
                    *max_len = len;
                }
                l -= 1;
                r += 1;
            }
        };

        for i in 0..s.len() {
            let i = i as i32;
            expand(i, i, &mut start, &mut max_len);       // Odd-length
            expand(i, i + 1, &mut start, &mut max_len);   // Even-length
        }

        String::from_utf8(s[start..start + max_len].to_vec()).unwrap()
    }
}
