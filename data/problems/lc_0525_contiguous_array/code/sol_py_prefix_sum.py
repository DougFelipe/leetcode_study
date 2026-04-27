class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        """
        Contiguous Array - Python Prefix Sum + First Occurrence Map
        Time: O(n), Space: O(n)

        Replace 0 with -1 conceptually. Equal 0s and 1s => subarray sum == 0.
        Track first index where each prefix sum appears.
        When prefix repeats at j, subarray (first_seen+1..j) has sum 0.
        """
        first_seen = {0: -1}  # prefix_sum -> first index seen
        prefix = 0
        max_len = 0

        for i, num in enumerate(nums):
            prefix += 1 if num == 1 else -1

            if prefix in first_seen:
                max_len = max(max_len, i - first_seen[prefix])
            else:
                first_seen[prefix] = i

        return max_len
