/**
 * Two Sum II - Kotlin Two Pointers
 * Time: O(n), Space: O(1)
 *
 * Uses when expression for clean branching on sorted array.
 */
class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        var left = 0
        var right = numbers.size - 1

        while (left < right) {
            val sum = numbers[left] + numbers[right]
            when {
                sum == target -> return intArrayOf(left + 1, right + 1) // 1-indexed
                sum < target -> left++
                else -> right--
            }
        }

        return intArrayOf() // Should never reach here
    }
}
