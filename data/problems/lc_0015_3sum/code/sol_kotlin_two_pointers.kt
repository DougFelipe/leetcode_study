/**
 * 3Sum - Kotlin Sort + Two Pointers
 * Time: O(n²), Space: O(log n) for sort
 *
 * Uses Kotlin's sort() and listOf for clean code.
 */
class Solution {
    fun threeSum(nums: IntArray): List<List<Int>> {
        nums.sort()
        val result = mutableListOf<List<Int>>()
        val n = nums.size

        for (i in 0 until n - 2) {
            // Early termination
            if (nums[i] > 0) break
            // Skip duplicate fixed element
            if (i > 0 && nums[i] == nums[i - 1]) continue

            var left = i + 1
            var right = n - 1
            while (left < right) {
                val sum = nums[i] + nums[left] + nums[right]
                when {
                    sum == 0 -> {
                        result.add(listOf(nums[i], nums[left], nums[right]))
                        // Skip duplicates
                        while (left < right && nums[left] == nums[left + 1]) left++
                        while (left < right && nums[right] == nums[right - 1]) right--
                        left++
                        right--
                    }
                    sum < 0 -> left++
                    else -> right--
                }
            }
        }

        return result
    }
}
