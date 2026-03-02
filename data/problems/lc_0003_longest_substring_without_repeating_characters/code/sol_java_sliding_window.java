import java.util.HashSet;
import java.util.Set;

/**
 * Longest Substring Without Repeating Characters - Java OOP Sliding Window
 * Time: O(n), Space: O(min(n, m))
 */
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> charSet = new HashSet<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            // Shrink window until duplicate is removed
            while (charSet.contains(s.charAt(right))) {
                charSet.remove(s.charAt(left));
                left++;
            }

            // Add current character and update max
            charSet.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
