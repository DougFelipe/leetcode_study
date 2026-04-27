use std::collections::HashMap;

impl Solution {
    /// Subarray Sum Equals K - Rust Prefix Sum + HashMap
    /// Time: O(n), Space: O(n)
    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        let mut prefix_count: HashMap<i32, i32> = HashMap::new();
        prefix_count.insert(0, 1); // Empty prefix

        let mut prefix = 0i32;
        let mut count = 0i32;

        for num in &nums {
            prefix += num;
            count += prefix_count.get(&(prefix - k)).copied().unwrap_or(0);
            *prefix_count.entry(prefix).or_insert(0) += 1;
        }

        count
    }
}
