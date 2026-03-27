class Solution:
    def totalFruit(self, fruits: list[int]) -> int:
        """
        Fruit Into Baskets - Python Sliding Window
        Time: O(n), Space: O(1)

        Longest subarray with at most 2 distinct elements.
        Frequency dict tracks fruit types in the current window.
        """
        basket = {}
        left = 0
        max_len = 0

        for right in range(len(fruits)):
            fruit = fruits[right]
            basket[fruit] = basket.get(fruit, 0) + 1

            # Shrink window until at most 2 types remain
            while len(basket) > 2:
                left_fruit = fruits[left]
                basket[left_fruit] -= 1
                if basket[left_fruit] == 0:
                    del basket[left_fruit]
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
