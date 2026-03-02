// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
// 
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }

impl Solution {
    pub fn add_two_numbers(
        l1: Option<Box<ListNode>>,
        l2: Option<Box<ListNode>>
    ) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode::new(0));
        let mut current = &mut dummy;
        let mut carry = 0;
        let mut p1 = l1.as_ref();
        let mut p2 = l2.as_ref();
        
        while p1.is_some() || p2.is_some() || carry != 0 {
            let x = p1.map_or(0, |node| node.val);
            let y = p2.map_or(0, |node| node.val);
            
            let sum = x + y + carry;
            carry = sum / 10;
            
            current.next = Some(Box::new(ListNode::new(sum % 10)));
            current = current.next.as_mut().unwrap();
            
            p1 = p1.and_then(|node| node.next.as_ref());
            p2 = p2.and_then(|node| node.next.as_ref());
        }
        
        dummy.next
    }
}
