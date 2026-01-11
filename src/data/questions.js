export const BEHAVIORAL_QUESTIONS = [
  "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
  "Describe a situation where you had to learn a new technology or skill quickly. What was your approach?",
  "Tell me about a time you made a mistake in a project. How did you handle it and what did you learn?",
  "Describe a situation where you had to disagree with your manager or team lead. How did you approach it?",
  "Tell me about your most challenging project and how you overcame the obstacles.",
  "Describe a time when you had to meet a tight deadline. How did you prioritize your work?",
  "Tell me about a situation where you had to convince others to see things your way.",
  "Describe a time when you received criticism. How did you respond?",
  "Tell me about a project where you took the initiative without being asked.",
  "Describe a situation where you had to handle multiple competing priorities.",
  "Tell me about a time when you failed. What did you learn from the experience?",
  "Describe a situation where you had to work with limited resources or information.",
  "Tell me about a time when you had to adapt to a significant change at work or school.",
  "Describe a situation where you went above and beyond what was required.",
  "Tell me about a time when you had to resolve a conflict between team members.",
  "Describe a project where you had to collaborate with people from different backgrounds or disciplines.",
  "Tell me about a time when you had to give someone difficult feedback.",
  "Describe a situation where you identified a problem before others noticed it.",
  "Tell me about a time when you had to make a decision with incomplete information.",
  "Describe a situation where you had to balance competing interests of different stakeholders.",
  "Tell me about a time when you improved a process or system.",
  "Describe a situation where you had to learn from failure and apply those lessons.",
  "Tell me about a time when you had to stand up for what you believed was right.",
  "Describe a project where effective communication was critical to success.",
  "Tell me about a time when you had to manage expectations of others.",
  "Describe a situation where you helped a struggling team member.",
  "Tell me about a time when you had to take responsibility for a team's failure.",
  "Describe a situation where you had to build relationships with new colleagues or clients.",
  "Tell me about a time when you had to present complex information to a non-technical audience.",
  "Describe a situation where you had to negotiate or compromise.",
  "Tell me about a time when you demonstrated leadership without having formal authority.",
  "Describe a project where you had to balance quality with speed.",
  "Tell me about a time when you had to handle a dissatisfied customer or user.",
  "Describe a situation where you had to work independently with minimal supervision.",
  "Tell me about a time when you identified an opportunity for improvement.",
  "Describe a situation where you had to debug a complex problem.",
  "Tell me about a time when you had to make an unpopular decision.",
  "Describe a project where you successfully managed scope creep.",
  "Tell me about a time when you had to motivate others.",
  "Describe a situation where you turned a negative situation into a positive outcome.",
  "Tell me about a time when you had to learn from someone with less experience than you.",
  "Describe a situation where you had to prioritize long-term goals over short-term gains.",
  "Tell me about a time when you had to deal with ambiguity or uncertainty.",
  "Describe a project where you demonstrated attention to detail.",
  "Tell me about a time when you had to advocate for resources or support.",
  "Describe a situation where you had to pivot your approach mid-project.",
  "Tell me about a time when you received recognition for your work. What made it successful?",
  "Describe a situation where you had to balance technical excellence with practical constraints.",
  "Tell me about a time when you contributed to creating a positive team culture.",
  "Describe a situation where you had to make a trade-off between different technical approaches."
];

export const TECHNICAL_TOPICS = {
  "Arrays & Strings": {
    easy: [
      {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
        ],
        constraints: ["2 <= nums.length <= 10^4"],
        signatures: {
          "Python": "def twoSum(nums: List[int], target: int) -> List[int]:",
          "JavaScript": "function twoSum(nums, target) {",
          "Java": "public int[] twoSum(int[] nums, int target) {",
          "C++": "vector<int> twoSum(vector<int>& nums, int target) {",
          "C": "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {",
          "Go": "func twoSum(nums []int, target int) []int {",
          "Ruby": "def two_sum(nums, target)"
        }
      }
    ],
    medium: [
      {
        title: "3Sum",
        description: "Given an integer array nums, return all triplets that sum to zero.",
        examples: [
          { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
        ],
        constraints: ["3 <= nums.length <= 3000"],
        signatures: {
          "Python": "def threeSum(nums: List[int]) -> List[List[int]]:",
          "JavaScript": "function threeSum(nums) {",
          "Java": "public List<List<Integer>> threeSum(int[] nums) {",
          "C++": "vector<vector<int>> threeSum(vector<int>& nums) {",
          "C": "int** threeSum(int* nums, int numsSize, int* returnSize) {",
          "Go": "func threeSum(nums []int) [][]int {",
          "Ruby": "def three_sum(nums)"
        }
      }
    ],
    hard: [
      {
        title: "Median of Two Sorted Arrays",
        description: "Find the median of two sorted arrays in O(log(m+n)) time.",
        examples: [
          { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }
        ],
        constraints: ["0 <= m, n <= 1000"],
        signatures: {
          "Python": "def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:",
          "JavaScript": "function findMedianSortedArrays(nums1, nums2) {",
          "Java": "public double findMedianSortedArrays(int[] nums1, int[] nums2) {",
          "C++": "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {",
          "C": "double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {",
          "Go": "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {",
          "Ruby": "def find_median_sorted_arrays(nums1, nums2)"
        }
      }
    ]
  },
  "Hash Maps & Sets": {
    easy: [
      {
        title: "Contains Duplicate",
        description: "Return true if any value appears at least twice in the array.",
        examples: [
          { input: "nums = [1,2,3,1]", output: "true" }
        ],
        constraints: ["1 <= nums.length <= 10^5"],
        signatures: {
          "Python": "def containsDuplicate(nums: List[int]) -> bool:",
          "JavaScript": "function containsDuplicate(nums) {",
          "Java": "public boolean containsDuplicate(int[] nums) {",
          "C++": "bool containsDuplicate(vector<int>& nums) {",
          "C": "bool containsDuplicate(int* nums, int numsSize) {",
          "Go": "func containsDuplicate(nums []int) bool {",
          "Ruby": "def contains_duplicate(nums)"
        }
      }
    ],
    medium: [
      {
        title: "Group Anagrams",
        description: "Group strings that are anagrams together.",
        examples: [
          { input: 'strs = ["eat","tea","tan"]', output: '[["eat","tea"],["tan"]]' }
        ],
        constraints: ["1 <= strs.length <= 10^4"],
        signatures: {
          "Python": "def groupAnagrams(strs: List[str]) -> List[List[str]]:",
          "JavaScript": "function groupAnagrams(strs) {",
          "Java": "public List<List<String>> groupAnagrams(String[] strs) {",
          "C++": "vector<vector<string>> groupAnagrams(vector<string>& strs) {",
          "C": "char*** groupAnagrams(char** strs, int strsSize) {",
          "Go": "func groupAnagrams(strs []string) [][]string {",
          "Ruby": "def group_anagrams(strs)"
        }
      }
    ],
    hard: []
  },
  "Two Pointers": {
    easy: [
      {
        title: "Valid Palindrome",
        description: "Check if a string is a palindrome ignoring non-alphanumeric characters.",
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: "true" }
        ],
        constraints: ["1 <= s.length <= 2 * 10^5"],
        signatures: {
          "Python": "def isPalindrome(s: str) -> bool:",
          "JavaScript": "function isPalindrome(s) {",
          "Java": "public boolean isPalindrome(String s) {",
          "C++": "bool isPalindrome(string s) {",
          "C": "bool isPalindrome(char* s) {",
          "Go": "func isPalindrome(s string) bool {",
          "Ruby": "def is_palindrome(s)"
        }
      }
    ],
    medium: [
      {
        title: "Container With Most Water",
        description: "Find two lines that form a container with the most water.",
        examples: [
          { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }
        ],
        constraints: ["2 <= height.length <= 10^5"],
        signatures: {
          "Python": "def maxArea(height: List[int]) -> int:",
          "JavaScript": "function maxArea(height) {",
          "Java": "public int maxArea(int[] height) {",
          "C++": "int maxArea(vector<int>& height) {",
          "C": "int maxArea(int* height, int heightSize) {",
          "Go": "func maxArea(height []int) int {",
          "Ruby": "def max_area(height)"
        }
      }
    ],
    hard: []
  },
  "Binary Search": {
    easy: [
      {
        title: "Binary Search",
        description: "Search for a target in a sorted array in O(log n) time.",
        examples: [
          { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }
        ],
        constraints: ["1 <= nums.length <= 10^4"],
        signatures: {
          "Python": "def search(nums: List[int], target: int) -> int:",
          "JavaScript": "function search(nums, target) {",
          "Java": "public int search(int[] nums, int target) {",
          "C++": "int search(vector<int>& nums, int target) {",
          "C": "int search(int* nums, int numsSize, int target) {",
          "Go": "func search(nums []int, target int) int {",
          "Ruby": "def search(nums, target)"
        }
      }
    ],
    medium: [
      {
        title: "Search in Rotated Sorted Array",
        description: "Search in a rotated sorted array in O(log n) time.",
        examples: [
          { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }
        ],
        constraints: ["1 <= nums.length <= 5000"],
        signatures: {
          "Python": "def search(nums: List[int], target: int) -> int:",
          "JavaScript": "function search(nums, target) {",
          "Java": "public int search(int[] nums, int target) {",
          "C++": "int search(vector<int>& nums, int target) {",
          "C": "int search(int* nums, int numsSize, int target) {",
          "Go": "func search(nums []int, target int) int {",
          "Ruby": "def search(nums, target)"
        }
      }
    ],
    hard: []
  },
  "Trees & Graphs": {
    easy: [
      {
        title: "Maximum Depth of Binary Tree",
        description: "Find the maximum depth of a binary tree.",
        examples: [
          { input: "root = [3,9,20,null,null,15,7]", output: "3" }
        ],
        constraints: ["Number of nodes: [0, 10^4]"],
        signatures: {
          "Python": "def maxDepth(root: Optional[TreeNode]) -> int:",
          "JavaScript": "function maxDepth(root) {",
          "Java": "public int maxDepth(TreeNode root) {",
          "C++": "int maxDepth(TreeNode* root) {",
          "C": "int maxDepth(struct TreeNode* root) {",
          "Go": "func maxDepth(root *TreeNode) int {",
          "Ruby": "def max_depth(root)"
        }
      }
    ],
    medium: [
      {
        title: "Number of Islands",
        description: "Count the number of islands in a 2D grid.",
        examples: [
          { input: 'grid = [["1","1","0"],["1","0","0"]]', output: "1" }
        ],
        constraints: ["1 <= m, n <= 300"],
        signatures: {
          "Python": "def numIslands(grid: List[List[str]]) -> int:",
          "JavaScript": "function numIslands(grid) {",
          "Java": "public int numIslands(char[][] grid) {",
          "C++": "int numIslands(vector<vector<char>>& grid) {",
          "C": "int numIslands(char** grid, int gridSize) {",
          "Go": "func numIslands(grid [][]byte) int {",
          "Ruby": "def num_islands(grid)"
        }
      }
    ],
    hard: []
  }
};