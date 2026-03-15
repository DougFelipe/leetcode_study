impl Solution {
    /// Two Sum II - Rust Two Pointers
    /// Time: O(n), Space: O(1)
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let mut left: usize = 0;
        let mut right: usize = numbers.len() - 1;

        while left < right {
            let sum = numbers[left] + numbers[right];
            if sum == target {
                return vec![(left + 1) as i32, (right + 1) as i32]; // 1-indexed
            } else if sum < target {
                left += 1;
            } else {
                right -= 1;
            }
        }

        vec![] // Should never reach here
    }
}
