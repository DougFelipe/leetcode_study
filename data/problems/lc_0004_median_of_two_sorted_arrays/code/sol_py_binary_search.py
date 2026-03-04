class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        """
        Median of Two Sorted Arrays - Python Binary Search Partition
        Time: O(log(min(m, n))), Space: O(1)
        
        Binary search on the smaller array to find the correct partition.
        """
        # Ensure nums1 is the smaller array
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        
        m, n = len(nums1), len(nums2)
        lo, hi = 0, m
        
        while lo <= hi:
            partition1 = (lo + hi) // 2
            partition2 = (m + n + 1) // 2 - partition1
            
            # Edge values with sentinels
            max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
            min_right1 = float('inf') if partition1 == m else nums1[partition1]
            max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
            min_right2 = float('inf') if partition2 == n else nums2[partition2]
            
            if max_left1 <= min_right2 and max_left2 <= min_right1:
                # Found correct partition
                if (m + n) % 2 == 1:
                    return float(max(max_left1, max_left2))
                else:
                    return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0
            elif max_left1 > min_right2:
                hi = partition1 - 1
            else:
                lo = partition1 + 1
        
        raise ValueError("Input arrays are not sorted")
