use std::collections::HashMap;

impl Solution {
    /// Contiguous Array - Rust Prefix Sum + First Occurrence HashMap
    /// Time: O(n), Space: O(n)
    pub fn find_max_length(nums: Vec<i32>) -> i32 {
        let mut first_seen: HashMap<i32, i32> = HashMap::new();
        first_seen.insert(0, -1);
        let mut prefix = 0i32;
        let mut max_len = 0i32;

        for (i, &num) in nums.iter().enumerate() {
            prefix += if num == 1 { 1 } else { -1 };

            if let Some(&first_idx) = first_seen.get(&prefix) {
                let len = i as i32 - first_idx;
                if len > max_len {
                    max_len = len;
                }
            } else {
                first_seen.insert(prefix, i as i32);
            }
        }

        max_len
    }
}
