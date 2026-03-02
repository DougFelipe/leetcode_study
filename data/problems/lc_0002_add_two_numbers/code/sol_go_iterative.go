package main

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

// addTwoNumbers adds two numbers represented as linked lists
// Time: O(max(m, n)), Space: O(max(m, n))
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    current := dummy
    carry := 0

    for l1 != nil || l2 != nil || carry != 0 {
        x := 0
        y := 0

        if l1 != nil {
            x = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            y = l2.Val
            l2 = l2.Next
        }

        sum := x + y + carry
        carry = sum / 10

        current.Next = &ListNode{Val: sum % 10}
        current = current.Next
    }

    return dummy.Next
}
