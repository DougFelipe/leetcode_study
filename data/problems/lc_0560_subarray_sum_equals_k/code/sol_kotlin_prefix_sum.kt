/**
 * Subarray Sum Equals K - Kotlin Prefix Sum + MutableMap
 * Time: O(n), Space: O(n)
 *
 * Uses mutableMapOf with getOrDefault. Initializes with {0 to 1}.
 */
class Solution {
    fun subarraySum(nums: IntArray, k: Int): Int {
        val prefixCount = mutableMapOf(0 to 1)
        var prefix = 0
        var count = 0

        for (num in nums) {
            prefix += num
            count += prefixCount.getOrDefault(prefix - k, 0)
            prefixCount[prefix] = prefixCount.getOrDefault(prefix, 0) + 1
        }

        return count
    }
}
