class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        """
        Longest Repeating Character Replacement - Python Sliding Window
        Time: O(n), Space: O(1)

        Window is valid when windowSize - maxFreq <= k.
        maxFreq never decreases — we only care about longer windows.
        """
        freq = [0] * 26
        left = 0
        max_freq = 0

        for right in range(len(s)):
            idx = ord(s[right]) - ord('A')
            freq[idx] += 1
            max_freq = max(max_freq, freq[idx])

            # If window is invalid, slide left by 1
            if (right - left + 1) - max_freq > k:
                freq[ord(s[left]) - ord('A')] -= 1
                left += 1

        return len(s) - left
