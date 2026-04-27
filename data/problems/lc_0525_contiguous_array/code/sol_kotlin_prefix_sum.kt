/**
 * Contiguous Array - Kotlin Prefix Sum + First Occurrence MutableMap
 * Time: O(n), Space: O(n)
 *
 * 0 → -1 transform. Equal 0s and 1s means subarray sum == 0.
 * Only insert to map when prefix not yet seen.
 */
class Solution {
    fun findMaxLength(nums: IntArray): Int {
        val firstSeen = mutableMapOf(0 to -1)
        var prefix = 0
        var maxLen = 0

        for (i in nums.indices) {
            prefix += if (nums[i] == 1) 1 else -1

            if (firstSeen.containsKey(prefix)) {
                maxLen = maxOf(maxLen, i - firstSeen[prefix]!!)
            } else {
                firstSeen[prefix] = i
            }
        }

        return maxLen
    }
}
