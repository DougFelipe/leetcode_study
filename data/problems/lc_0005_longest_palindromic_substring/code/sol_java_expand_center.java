/**
 * Longest Palindromic Substring - Java OOP Expand Around Center
 * Time: O(n²), Space: O(1)
 */
class Solution {
    private int start = 0;
    private int maxLen = 1;

    public String longestPalindrome(String s) {
        if (s.length() < 2)
            return s;

        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i); // Odd-length palindromes
            expand(s, i, i + 1); // Even-length palindromes
        }

        return s.substring(start, start + maxLen);
    }

    private void expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    }
}
