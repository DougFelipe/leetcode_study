class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        Longest Substring Without Repeating Characters - Python Sliding Window
        Time: O(n), Space: O(min(n, m))
        
        Uses a sliding window with a hash set to track unique characters.
        """
        char_set = set()
        left = 0
        max_len = 0
        
        for right in range(len(s)):
            # Shrink window until duplicate is removed
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            
            # Add current character and update max
            char_set.add(s[right])
            max_len = max(max_len, right - left + 1)
        
        return max_len
