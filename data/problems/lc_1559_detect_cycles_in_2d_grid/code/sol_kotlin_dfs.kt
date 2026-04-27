/**
 * Detect Cycles in 2D Grid - Kotlin DFS with Parent Tracking
 * Time: O(m * n), Space: O(m * n)
 */
class Solution {
    private val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))

    fun containsCycle(grid: Array<CharArray>): Boolean {
        val m = grid.size
        val n = grid[0].size
        val visited = Array(m) { BooleanArray(n) }

        fun dfs(r: Int, c: Int, pr: Int, pc: Int): Boolean {
            visited[r][c] = true
            for (d in dirs) {
                val nr = r + d[0]
                val nc = c + d[1]
                if (nr !in 0 until m || nc !in 0 until n) continue
                if (grid[nr][nc] != grid[r][c]) continue
                if (nr == pr && nc == pc) continue // Skip parent
                if (visited[nr][nc]) return true   // Cycle found
                if (dfs(nr, nc, r, c)) return true
            }
            return false
        }

        for (r in 0 until m) {
            for (c in 0 until n) {
                if (!visited[r][c]) {
                    if (dfs(r, c, -1, -1)) return true
                }
            }
        }
        return false
    }
}
