/**
 * Definition for singly-linked list.
 * class ListNode(_x: Int = 0, _next: ListNode = null) {
 *   var next: ListNode = _next
 *   var x: Int = _x
 * }
 */

/**
 * Add Two Numbers - Scala Recursive Solution
 * Time: O(max(m, n)), Space: O(max(m, n))
 * 
 * Uses tail recursion for functional approach.
 */
object Solution {
  def addTwoNumbers(l1: ListNode, l2: ListNode): ListNode = {
    def add(n1: ListNode, n2: ListNode, carry: Int): ListNode = {
      if (n1 == null && n2 == null && carry == 0) {
        null
      } else {
        val x = if (n1 != null) n1.x else 0
        val y = if (n2 != null) n2.x else 0
        val sum = x + y + carry
        
        val node = new ListNode(sum % 10)
        node.next = add(
          if (n1 != null) n1.next else null,
          if (n2 != null) n2.next else null,
          sum / 10
        )
        node
      }
    }
    
    add(l1, l2, 0)
  }
}
