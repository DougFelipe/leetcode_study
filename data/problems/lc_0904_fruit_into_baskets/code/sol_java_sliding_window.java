import java.util.HashMap;
import java.util.Map;

/**
 * Fruit Into Baskets - Java OOP Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Longest subarray with at most 2 distinct elements.
 */
class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> basket = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < fruits.length; right++) {
            basket.put(fruits[right], basket.getOrDefault(fruits[right], 0) + 1);

            while (basket.size() > 2) {
                basket.put(fruits[left], basket.get(fruits[left]) - 1);
                if (basket.get(fruits[left]) == 0) {
                    basket.remove(fruits[left]);
                }
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
