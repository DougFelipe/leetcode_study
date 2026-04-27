impl Solution {
    /// Subarray Sums Divisible by K - Rust Prefix Mod + Vec
    /// Time: O(n), Space: O(k)
    ///
    /// Rust % can return negative — normalize with ((prefix % k) + k) % k.
    pub fn subarrays_div_by_k(nums: Vec<i32>, k: i32) -> i32 {
        let k_us = k as usize;
        let mut freq = vec![0i32; k_us];
        freq[0] = 1;
        let mut prefix = 0i32;
        let mut count = 0i32;

        for num in &nums {
            prefix = ((prefix + num) % k + k) % k; // Normalize negative
            count += freq[prefix as usize];
            freq[prefix as usize] += 1;
        }

        count
    }
}
