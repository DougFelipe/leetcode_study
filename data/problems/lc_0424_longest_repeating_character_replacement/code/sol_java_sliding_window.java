/**
 * Longest Repeating Character Replacement - Java OOP Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Window valid when windowSize - maxFreq <= k.
 * maxFreq never decreases.
 */
class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int left = 0;
        int maxFreq = 0;

        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']);

            if ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }
        }

        return s.length() - left;
    }
}
