/**
 * Detect Cycles in 2D Grid - Java OOP DFS with Parent Tracking
 * Time: O(m * n), Space: O(m * n)
 */
class Solution {
    private int m, n;
    private char[][] grid;
    private boolean[][] visited;
    private final int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public boolean containsCycle(char[][] grid) {
        this.m = grid.length;
        this.n = grid[0].length;
        this.grid = grid;
        this.visited = new boolean[m][n];

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (!visited[r][c]) {
                    if (dfs(r, c, -1, -1)) return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(int r, int c, int pr, int pc) {
        visited[r][c] = true;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (grid[nr][nc] != grid[r][c]) continue;
            if (nr == pr && nc == pc) continue; // Skip parent
            if (visited[nr][nc]) return true;   // Cycle found
            if (dfs(nr, nc, r, c)) return true;
        }
        return false;
    }
}
