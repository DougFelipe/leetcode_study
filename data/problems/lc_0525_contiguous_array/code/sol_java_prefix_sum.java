import java.util.HashMap;
import java.util.Map;

/**
 * Contiguous Array - Java OOP Prefix Sum + First Occurrence HashMap
 * Time: O(n), Space: O(n)
 *
 * 0 → -1 transform: equal 0s and 1s means subarray sum == 0.
 * Store FIRST index per prefix sum. Length = j - first_seen[prefix].
 */
class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0, -1);
        int prefix = 0;
        int maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            prefix += nums[i] == 1 ? 1 : -1;

            if (firstSeen.containsKey(prefix)) {
                maxLen = Math.max(maxLen, i - firstSeen.get(prefix));
            } else {
                firstSeen.put(prefix, i);
            }
        }

        return maxLen;
    }
}
