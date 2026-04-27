package main

// containsCycle detects if any cycle of same value exists in the 2D grid
// Time: O(m * n), Space: O(m * n)
func containsCycle(grid [][]byte) bool {
	m, n := len(grid), len(grid[0])
	visited := make([][]bool, m)
	for i := range visited {
		visited[i] = make([]bool, n)
	}
	dirs := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

	var dfs func(r, c, pr, pc int) bool
	dfs = func(r, c, pr, pc int) bool {
		visited[r][c] = true
		for _, d := range dirs {
			nr, nc := r+d[0], c+d[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n {
				continue
			}
			if grid[nr][nc] != grid[r][c] {
				continue
			}
			if nr == pr && nc == pc { // Skip parent
				continue
			}
			if visited[nr][nc] {
				return true // Cycle found
			}
			if dfs(nr, nc, r, c) {
				return true
			}
		}
		return false
	}

	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if !visited[r][c] {
				if dfs(r, c, -1, -1) {
					return true
				}
			}
		}
	}
	return false
}
