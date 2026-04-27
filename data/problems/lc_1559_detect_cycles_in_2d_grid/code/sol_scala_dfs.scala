/**
 * Detect Cycles in 2D Grid - Scala DFS with Parent Tracking
 * Time: O(m * n), Space: O(m * n)
 */
object Solution {
  def containsCycle(grid: Array[Array[Char]]): Boolean = {
    val m = grid.length
    val n = grid(0).length
    val visited = Array.ofDim[Boolean](m, n)
    val dirs = Array((0, 1), (0, -1), (1, 0), (-1, 0))

    def dfs(r: Int, c: Int, pr: Int, pc: Int): Boolean = {
      visited(r)(c) = true
      dirs.exists { case (dr, dc) =>
        val nr = r + dr
        val nc = c + dc
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) false
        else if (grid(nr)(nc) != grid(r)(c)) false
        else if (nr == pr && nc == pc) false // Skip parent
        else if (visited(nr)(nc)) true       // Cycle found
        else dfs(nr, nc, r, c)
      }
    }

    (0 until m).exists { r =>
      (0 until n).exists { c =>
        !visited(r)(c) && dfs(r, c, -1, -1)
      }
    }
  }
}
