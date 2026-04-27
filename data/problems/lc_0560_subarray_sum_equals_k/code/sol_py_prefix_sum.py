class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        """
        Subarray Sum Equals K - Python Prefix Sum + Hash Map
        Time: O(n), Space: O(n)

        For each index j, count previous prefix sums equal to (prefix[j] - k).
        Initialize {0: 1} to handle subarrays starting at index 0.
        """
        prefix_count = {0: 1}
        prefix = 0
        count = 0

        for num in nums:
            prefix += num
            count += prefix_count.get(prefix - k, 0)
            prefix_count[prefix] = prefix_count.get(prefix, 0) + 1

        return count
