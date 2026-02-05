import java.util.HashMap;
import java.util.Map;

/**
 * Two Sum - OOP Classic Java Solution
 * Time: O(n), Space: O(n)
 */
public class Solution {
    /**
     * Finds two indices in nums that sum to target.
     * Uses HashMap for O(1) complement lookup.
     */
    public int[] twoSum(int[] nums, int target) {
        // HashMap to store value -> index mapping
        Map<Integer, Integer> seen = new HashMap<>();
        
        // Iterate through array with index
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            // Check if complement exists in our map
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            
            // Add current value and index to map
            seen.put(nums[i], i);
        }
        
        // No solution found (shouldn't happen per problem constraints)
        throw new IllegalArgumentException("No two sum solution");
    }
}
