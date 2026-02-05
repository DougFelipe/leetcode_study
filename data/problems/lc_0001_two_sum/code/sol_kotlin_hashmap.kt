/**
 * Two Sum - Kotlin OOP Classic Solution
 * Time: O(n), Space: O(n)
 */
class Solution {
    /**
     * Finds two indices in nums that sum to target.
     * Uses HashMap for O(1) complement lookup.
     * Kotlin's null-safety and concise syntax make this elegant.
     */
    fun twoSum(nums: IntArray, target: Int): IntArray {
        // HashMap to store value -> index mapping
        val seen = mutableMapOf<Int, Int>()
        
        // Iterate with index using forEachIndexed
        nums.forEachIndexed { i, num ->
            val complement = target - num
            
            // Check if complement exists
            seen[complement]?.let { complementIndex ->
                return intArrayOf(complementIndex, i)
            }
            
            // Add current value and index
            seen[num] = i
        }
        
        // No solution found
        throw IllegalArgumentException("No two sum solution")
    }
}

// Extension function for more idiomatic usage
fun IntArray.twoSum(target: Int): IntArray {
    val seen = mutableMapOf<Int, Int>()
    forEachIndexed { i, num ->
        seen[target - num]?.let { return intArrayOf(it, i) }
        seen[num] = i
    }
    throw IllegalArgumentException("No two sum solution")
}
