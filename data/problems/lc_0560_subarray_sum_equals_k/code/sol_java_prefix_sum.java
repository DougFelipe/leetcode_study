import java.util.HashMap;
import java.util.Map;

/**
 * Subarray Sum Equals K - Java OOP Prefix Sum + HashMap
 * Time: O(n), Space: O(n)
 *
 * sum(i,j) = prefix[j] - prefix[i]. Count pairs where prefix[j] - prefix[i] == k.
 */
class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1); // Empty prefix has sum 0

        int prefix = 0;
        int count = 0;

        for (int num : nums) {
            prefix += num;
            count += prefixCount.getOrDefault(prefix - k, 0);
            prefixCount.put(prefix, prefixCount.getOrDefault(prefix, 0) + 1);
        }

        return count;
    }
}
