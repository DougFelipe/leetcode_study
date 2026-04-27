/**
 * Subarray Sums Divisible by K - Kotlin Prefix Mod + IntArray
 * Time: O(n), Space: O(k)
 *
 * Kotlin % can return negative — normalize with ((prefix % k) + k) % k.
 */
class Solution {
    fun subarraysDivByK(nums: IntArray, k: Int): Int {
        val freq = IntArray(k)
        freq[0] = 1
        var prefix = 0
        var count = 0

        for (num in nums) {
            prefix = ((prefix + num) % k + k) % k // Normalize
            count += freq[prefix]
            freq[prefix]++
        }

        return count
    }
}
