/**
 * Subarray Sums Divisible by K - Java OOP Prefix Mod + Frequency Array
 * Time: O(n), Space: O(k)
 *
 * IMPORTANT: Java % can return negative for negative dividends.
 * Must normalize: ((prefix % k) + k) % k
 */
class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int[] freq = new int[k];
        freq[0] = 1;
        int prefix = 0;
        int count = 0;

        for (int num : nums) {
            prefix = ((prefix + num) % k + k) % k; // Normalize negative
            count += freq[prefix];
            freq[prefix]++;
        }

        return count;
    }
}
