impl Solution {
    /// Detect Cycles in 2D Grid - Rust DFS with Parent Tracking
    /// Time: O(m * n), Space: O(m * n)
    pub fn contains_cycle(grid: Vec<Vec<char>>) -> bool {
        let m = grid.len();
        let n = grid[0].len();
        let mut visited = vec![vec![false; n]; m];
        let dirs: [(i32, i32); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];

        fn dfs(
            r: i32, c: i32, pr: i32, pc: i32,
            m: i32, n: i32,
            grid: &Vec<Vec<char>>,
            visited: &mut Vec<Vec<bool>>,
            dirs: &[(i32, i32); 4],
        ) -> bool {
            visited[r as usize][c as usize] = true;
            for &(dr, dc) in dirs {
                let nr = r + dr;
                let nc = c + dc;
                if nr < 0 || nr >= m || nc < 0 || nc >= n { continue; }
                if grid[nr as usize][nc as usize] != grid[r as usize][c as usize] { continue; }
                if nr == pr && nc == pc { continue; } // Skip parent
                if visited[nr as usize][nc as usize] { return true; } // Cycle found
                if dfs(nr, nc, r, c, m, n, grid, visited, dirs) { return true; }
            }
            false
        }

        for r in 0..m {
            for c in 0..n {
                if !visited[r][c] {
                    if dfs(r as i32, c as i32, -1, -1, m as i32, n as i32, &grid, &mut visited, &dirs) {
                        return true;
                    }
                }
            }
        }
        false
    }
}
