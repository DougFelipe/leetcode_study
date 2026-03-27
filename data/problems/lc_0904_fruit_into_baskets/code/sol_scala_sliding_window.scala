import scala.collection.mutable

/**
 * Fruit Into Baskets - Scala Sliding Window
 * Time: O(n), Space: O(1)
 *
 * Longest subarray with at most 2 distinct fruit types.
 */
object Solution {
  def totalFruit(fruits: Array[Int]): Int = {
    val basket = mutable.Map[Int, Int]().withDefaultValue(0)
    var left = 0
    var maxLen = 0

    for (right <- fruits.indices) {
      basket(fruits(right)) += 1

      while (basket.size > 2) {
        val leftFruit = fruits(left)
        basket(leftFruit) -= 1
        if (basket(leftFruit) == 0) {
          basket.remove(leftFruit)
        }
        left += 1
      }

      maxLen = math.max(maxLen, right - left + 1)
    }

    maxLen
  }
}
