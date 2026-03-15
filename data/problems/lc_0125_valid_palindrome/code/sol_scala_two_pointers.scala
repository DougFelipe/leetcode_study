/**
 * Valid Palindrome - Scala Functional Two Pointers
 * Time: O(n), Space: O(1)
 *
 * Uses tail recursion for functional two-pointer approach.
 */
object Solution {
  def isPalindrome(s: String): Boolean = {
    @scala.annotation.tailrec
    def check(left: Int, right: Int): Boolean = {
      if (left >= right) true
      else if (!s(left).isLetterOrDigit) check(left + 1, right)
      else if (!s(right).isLetterOrDigit) check(left, right - 1)
      else if (s(left).toLower != s(right).toLower) false
      else check(left + 1, right - 1)
    }

    check(0, s.length - 1)
  }
}
