/**
 * Two Sum - Scala Functional Solution
 * Time: O(n), Space: O(n)
 * 
 * LeetCode-compatible implementation using tail recursion
 */
object Solution {
  def twoSum(nums: Array[Int], target: Int): Array[Int] = {
    @scala.annotation.tailrec
    def loop(i: Int, seen: Map[Int, Int]): Array[Int] = {
      if (i >= nums.length) {
        Array.empty // No solution found
      } else {
        val complement = target - nums(i)
        seen.get(complement) match {
          case Some(j) => Array(j, i)
          case None => loop(i + 1, seen + (nums(i) -> i))
        }
      }
    }
    
    loop(0, Map.empty)
  }
}
