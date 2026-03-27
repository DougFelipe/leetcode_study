/**
 * Fruit Into Baskets - JavaScript Sliding Window
 * Time: O(n), Space: O(1)
 *
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
    const basket = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < fruits.length; right++) {
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

        while (basket.size > 2) {
            const leftFruit = fruits[left];
            basket.set(leftFruit, basket.get(leftFruit) - 1);
            if (basket.get(leftFruit) === 0) {
                basket.delete(leftFruit);
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
