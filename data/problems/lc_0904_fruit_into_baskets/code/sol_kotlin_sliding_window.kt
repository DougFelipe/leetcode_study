/**
 * Fruit Into Baskets - Kotlin Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Longest subarray with at most 2 distinct fruit types.
 */
class Solution {
    fun totalFruit(fruits: IntArray): Int {
        val basket = mutableMapOf<Int, Int>()
        var left = 0
        var maxLen = 0

        for (right in fruits.indices) {
            basket[fruits[right]] = basket.getOrDefault(fruits[right], 0) + 1

            while (basket.size > 2) {
                val leftFruit = fruits[left]
                basket[leftFruit] = basket[leftFruit]!! - 1
                if (basket[leftFruit] == 0) {
                    basket.remove(leftFruit)
                }
                left++
            }

            maxLen = maxOf(maxLen, right - left + 1)
        }

        return maxLen
    }
}
