from collections import Counter


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        """
        Minimum Window Substring - Python Sliding Window
        Time: O(m + n), Space: O(m + n)

        Two frequency maps: 'need' from t, 'window' for current window.
        Track 'have' (satisfied chars) vs 'required' (distinct chars in t).
        """
        if not s or not t or len(s) < len(t):
            return ""

        need = Counter(t)
        window = {}
        required = len(need)
        have = 0

        result = ""
        min_len = float("inf")
        left = 0

        for right in range(len(s)):
            char = s[right]
            window[char] = window.get(char, 0) + 1

            # Check if this character's frequency is now satisfied
            if char in need and window[char] == need[char]:
                have += 1

            # Shrink window while all characters are satisfied
            while have == required:
                # Update result if this window is smaller
                if (right - left + 1) < min_len:
                    min_len = right - left + 1
                    result = s[left:right + 1]

                # Remove leftmost character
                left_char = s[left]
                window[left_char] -= 1
                if left_char in need and window[left_char] < need[left_char]:
                    have -= 1
                left += 1

        return result
