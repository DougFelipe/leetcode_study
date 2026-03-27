use std::collections::HashMap;

impl Solution {
    /// Fruit Into Baskets - Rust Sliding Window
    /// Time: O(n), Space: O(1)
    pub fn total_fruit(fruits: Vec<i32>) -> i32 {
        let mut basket: HashMap<i32, i32> = HashMap::new();
        let mut left: usize = 0;
        let mut max_len: usize = 0;

        for right in 0..fruits.len() {
            *basket.entry(fruits[right]).or_insert(0) += 1;

            while basket.len() > 2 {
                let left_fruit = fruits[left];
                if let Some(count) = basket.get_mut(&left_fruit) {
                    *count -= 1;
                    if *count == 0 {
                        basket.remove(&left_fruit);
                    }
                }
                left += 1;
            }

            max_len = max_len.max(right - left + 1);
        }

        max_len as i32
    }
}
