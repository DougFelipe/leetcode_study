/**
 * Two Sum - JavaScript OOP Prototype-based Solution
 * Time: O(n), Space: O(n)
 * 
 * Uses prototype-based OOP pattern with Map for O(1) lookups.
 * Demonstrates JavaScript's unique object model.
 */

/**
 * TwoSumSolver constructor function
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 */
function TwoSumSolver(nums, target) {
    this.nums = nums;
    this.target = target;
    this.seen = new Map();
}

// Add solve method to prototype
TwoSumSolver.prototype.solve = function () {
    for (let i = 0; i < this.nums.length; i++) {
        const complement = this.target - this.nums[i];

        if (this.seen.has(complement)) {
            return [this.seen.get(complement), i];
        }

        this.seen.set(this.nums[i], i);
    }

    throw new Error("No two sum solution");
};

// Factory function (alternative pattern)
function createTwoSumSolver(nums, target) {
    return {
        nums,
        target,
        seen: new Map(),
        solve() {
            for (let i = 0; i < this.nums.length; i++) {
                const complement = this.target - this.nums[i];
                if (this.seen.has(complement)) {
                    return [this.seen.get(complement), i];
                }
                this.seen.set(this.nums[i], i);
            }
            throw new Error("No two sum solution");
        }
    };
}

// ES6 Class syntax (syntactic sugar over prototype)
class TwoSumSolverClass {
    constructor(nums, target) {
        this.nums = nums;
        this.target = target;
    }

    solve() {
        const seen = new Map();
        for (let i = 0; i < this.nums.length; i++) {
            const complement = this.target - this.nums[i];
            if (seen.has(complement)) {
                return [seen.get(complement), i];
            }
            seen.set(this.nums[i], i);
        }
        throw new Error("No two sum solution");
    }
}

// Functional style export
const twoSum = (nums, target) => {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return null;
};

module.exports = { TwoSumSolver, createTwoSumSolver, TwoSumSolverClass, twoSum };
