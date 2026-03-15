class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        """
        Two Sum II - Python Two Pointers
        Time: O(n), Space: O(1)
        
        Two pointers from opposite ends of sorted array.
        """
        left, right = 0, len(numbers) - 1
        
        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]  # 1-indexed
            elif total < target:
                left += 1
            else:
                right -= 1
        
        return []  # Should never reach here
