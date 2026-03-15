/**
 * Two Sum II - Scala Functional Two Pointers
 * Time: O(n), Space: O(1)
 *
 * Uses tail recursion for functional two-pointer approach.
 */
object Solution {
  def twoSum(numbers: Array[Int], target: Int): Array[Int] = {
    @scala.annotation.tailrec
    def search(left: Int, right: Int): Array[Int] = {
      val sum = numbers(left) + numbers(right)
      if (sum == target) {
        Array(left + 1, right + 1) // 1-indexed
      } else if (sum < target) {
        search(left + 1, right)
      } else {
        search(left, right - 1)
      }
    }

    search(0, numbers.length - 1)
  }
}
