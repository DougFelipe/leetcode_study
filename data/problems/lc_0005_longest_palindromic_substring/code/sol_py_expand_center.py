class Solution:
    def longestPalindrome(self, s: str) -> str:
        """
        Longest Palindromic Substring - Python Expand Around Center
        Time: O(n²), Space: O(1)
        
        Expands around each possible center (char and gap) to find palindromes.
        """
        start = 0
        max_len = 1
        
        def expand(left: int, right: int) -> None:
            nonlocal start, max_len
            while left >= 0 and right < len(s) and s[left] == s[right]:
                if right - left + 1 > max_len:
                    start = left
                    max_len = right - left + 1
                left -= 1
                right += 1
        
        for i in range(len(s)):
            expand(i, i)      # Odd-length palindromes
            expand(i, i + 1)  # Even-length palindromes
        
        return s[start:start + max_len]
