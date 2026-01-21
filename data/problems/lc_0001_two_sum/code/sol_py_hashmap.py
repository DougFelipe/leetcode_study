from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Find two indices in nums that sum to target.
        Time: O(n), Space: O(n)
        """
        # Dictionary to store value -> index mapping
        seen = {}

        # Iterate with both index and value
        for i, num in enumerate(nums):
            # Calculate the complement we're looking for
            complement = target - num

            # Check if complement exists in our dictionary
            if complement in seen:
                # Found it! Return both indices
                return [seen[complement], i]

            # Store current number and its index for future lookups
            seen[num] = i

        # No solution found (problem guarantees this won't happen)
        return []
