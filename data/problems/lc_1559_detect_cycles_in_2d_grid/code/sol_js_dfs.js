/**
 * Detect Cycles in 2D Grid - JavaScript DFS with Parent Tracking
 * Time: O(m * n), Space: O(m * n)
 *
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(r, c, pr, pc) {
        visited[r][c] = true;
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (grid[nr][nc] !== grid[r][c]) continue;
            if (nr === pr && nc === pc) continue; // Skip parent
            if (visited[nr][nc]) return true;     // Cycle found
            if (dfs(nr, nc, r, c)) return true;
        }
        return false;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (!visited[r][c]) {
                if (dfs(r, c, -1, -1)) return true;
            }
        }
    }
    return false;
};
