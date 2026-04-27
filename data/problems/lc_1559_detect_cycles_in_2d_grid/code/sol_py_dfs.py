class Solution:
    def containsCycle(self, grid: list[list[str]]) -> bool:
        """
        Detect Cycles in 2D Grid - Python DFS with Parent Tracking
        Time: O(m * n), Space: O(m * n)

        DFS from each unvisited cell. A cycle is detected when we reach
        an already-visited cell that is NOT the immediate parent.
        """
        m, n = len(grid), len(grid[0])
        visited = [[False] * n for _ in range(m)]
        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        def dfs(r: int, c: int, pr: int, pc: int) -> bool:
            visited[r][c] = True
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if not (0 <= nr < m and 0 <= nc < n):
                    continue
                if grid[nr][nc] != grid[r][c]:
                    continue
                if nr == pr and nc == pc:  # Skip parent
                    continue
                if visited[nr][nc]:
                    return True  # Cycle found
                if dfs(nr, nc, r, c):
                    return True
            return False

        for r in range(m):
            for c in range(n):
                if not visited[r][c]:
                    if dfs(r, c, -1, -1):
                        return True
        return False
