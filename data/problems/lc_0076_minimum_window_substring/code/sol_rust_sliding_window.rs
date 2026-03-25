use std::collections::HashMap;

impl Solution {
    /// Minimum Window Substring - Rust Sliding Window
    /// Time: O(m + n), Space: O(m + n)
    pub fn min_window(s: String, t: String) -> String {
        if s.len() < t.len() {
            return String::new();
        }

        let s_bytes = s.as_bytes();
        let mut need: HashMap<u8, i32> = HashMap::new();
        let mut window: HashMap<u8, i32> = HashMap::new();

        for &b in t.as_bytes() {
            *need.entry(b).or_insert(0) += 1;
        }

        let required = need.len();
        let mut have: usize = 0;
        let mut left: usize = 0;
        let mut min_len: usize = usize::MAX;
        let mut min_start: usize = 0;

        for right in 0..s_bytes.len() {
            let c = s_bytes[right];
            *window.entry(c).or_insert(0) += 1;

            if let Some(&needed) = need.get(&c) {
                if window[&c] == needed {
                    have += 1;
                }
            }

            while have == required {
                if right - left + 1 < min_len {
                    min_len = right - left + 1;
                    min_start = left;
                }

                let left_char = s_bytes[left];
                *window.get_mut(&left_char).unwrap() -= 1;
                if let Some(&needed) = need.get(&left_char) {
                    if window[&left_char] < needed {
                        have -= 1;
                    }
                }
                left += 1;
            }
        }

        if min_len == usize::MAX {
            String::new()
        } else {
            s[min_start..min_start + min_len].to_string()
        }
    }
}
