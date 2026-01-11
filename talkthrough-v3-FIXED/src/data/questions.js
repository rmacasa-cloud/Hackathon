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
      { question: "Two Sum: Given an array of integers and a target, return indices of two numbers that add up to the target.", example: "Input: [2,7,11,15], target=9. Output: [0,1]" },
      { question: "Valid Palindrome: Check if a string is a palindrome, ignoring non-alphanumeric characters and case.", example: "Input: 'A man, a plan, a canal: Panama'. Output: true" },
      { question: "Best Time to Buy and Sell Stock: Find maximum profit from buying and selling stock once.", example: "Input: [7,1,5,3,6,4]. Output: 5" }
    ],
    medium: [
      { question: "3Sum: Find all unique triplets in array that sum to zero.", example: "Input: [-1,0,1,2,-1,-4]. Output: [[-1,-1,2],[-1,0,1]]" },
      { question: "Longest Substring Without Repeating Characters: Find length of longest substring without repeating characters.", example: "Input: 'abcabcbb'. Output: 3" },
      { question: "Container With Most Water: Find two lines that together with x-axis forms container with most water.", example: "Input: [1,8,6,2,5,4,8,3,7]. Output: 49" }
    ],
    hard: [
      { question: "Median of Two Sorted Arrays: Find median of two sorted arrays.", example: "Input: [1,3], [2]. Output: 2.0" },
      { question: "Trapping Rain Water: Calculate how much rain water can be trapped between bars.", example: "Input: [0,1,0,2,1,0,1,3,2,1,2,1]. Output: 6" },
      { question: "Minimum Window Substring: Find minimum window in string that contains all characters of another string.", example: "Input: s='ADOBECODEBANC', t='ABC'. Output: 'BANC'" }
    ]
  },
  "Hash Maps & Sets": {
    easy: [
      { question: "Contains Duplicate: Check if array contains any duplicates.", example: "Input: [1,2,3,1]. Output: true" },
      { question: "Valid Anagram: Check if two strings are anagrams.", example: "Input: s='anagram', t='nagaram'. Output: true" },
      { question: "Intersection of Two Arrays: Find intersection of two arrays.", example: "Input: [1,2,2,1], [2,2]. Output: [2]" }
    ],
    medium: [
      { question: "Group Anagrams: Group strings that are anagrams of each other.", example: "Input: ['eat','tea','tan','ate','nat','bat']. Output: [['bat'],['nat','tan'],['ate','eat','tea']]" },
      { question: "Top K Frequent Elements: Find k most frequent elements in array.", example: "Input: [1,1,1,2,2,3], k=2. Output: [1,2]" },
      { question: "Longest Consecutive Sequence: Find length of longest consecutive elements sequence.", example: "Input: [100,4,200,1,3,2]. Output: 4" }
    ],
    hard: [
      { question: "Substring with Concatenation of All Words: Find all starting indices of concatenated substrings.", example: "Input: s='barfoothefoobarman', words=['foo','bar']. Output: [0,9]" },
      { question: "LRU Cache: Design and implement a Least Recently Used cache.", example: "Implement get(key) and put(key, value) in O(1)" },
      { question: "All O'one Data Structure: Design data structure supporting insert, remove, getMaxKey, getMinKey in O(1).", example: "All operations in O(1) time" }
    ]
  },
  "Two Pointers": {
    easy: [
      { question: "Valid Palindrome: Use two pointers to check if string is palindrome.", example: "Input: 'racecar'. Output: true" },
      { question: "Remove Duplicates from Sorted Array: Remove duplicates in-place and return new length.", example: "Input: [1,1,2]. Output: 2" },
      { question: "Move Zeroes: Move all zeros to end while maintaining relative order.", example: "Input: [0,1,0,3,12]. Output: [1,3,12,0,0]" }
    ],
    medium: [
      { question: "3Sum: Find all triplets that sum to zero using two pointers.", example: "Input: [-1,0,1,2,-1,-4]. Output: [[-1,-1,2],[-1,0,1]]" },
      { question: "Container With Most Water: Use two pointers to find max area.", example: "Input: [1,8,6,2,5,4,8,3,7]. Output: 49" },
      { question: "Sort Colors: Sort array of 0s, 1s, 2s in one pass.", example: "Input: [2,0,2,1,1,0]. Output: [0,0,1,1,2,2]" }
    ],
    hard: [
      { question: "Trapping Rain Water: Use two pointers to calculate trapped water.", example: "Input: [0,1,0,2,1,0,1,3,2,1,2,1]. Output: 6" },
      { question: "Minimum Window Substring: Use sliding window with two pointers.", example: "Input: s='ADOBECODEBANC', t='ABC'. Output: 'BANC'" },
      { question: "Longest Substring with At Most K Distinct Characters: Use sliding window technique.", example: "Input: s='eceba', k=2. Output: 3" }
    ]
  },
  "Binary Search": {
    easy: [
      { question: "Binary Search: Implement binary search on sorted array.", example: "Input: [-1,0,3,5,9,12], target=9. Output: 4" },
      { question: "Search Insert Position: Find index where target should be inserted.", example: "Input: [1,3,5,6], target=5. Output: 2" },
      { question: "First Bad Version: Find first bad version using binary search.", example: "Input: n=5, bad=4. Output: 4" }
    ],
    medium: [
      { question: "Search in Rotated Sorted Array: Search for target in rotated sorted array.", example: "Input: [4,5,6,7,0,1,2], target=0. Output: 4" },
      { question: "Find Peak Element: Find a peak element in array.", example: "Input: [1,2,3,1]. Output: 2" },
      { question: "Find Minimum in Rotated Sorted Array: Find minimum element in rotated sorted array.", example: "Input: [3,4,5,1,2]. Output: 1" }
    ],
    hard: [
      { question: "Median of Two Sorted Arrays: Find median using binary search.", example: "Input: [1,3], [2]. Output: 2.0" },
      { question: "Find K-th Smallest Pair Distance: Find kth smallest distance between pairs.", example: "Input: [1,3,1], k=1. Output: 0" },
      { question: "Split Array Largest Sum: Minimize largest sum among m subarrays.", example: "Input: [7,2,5,10,8], m=2. Output: 18" }
    ]
  },
  "Trees & Graphs": {
    easy: [
      { question: "Maximum Depth of Binary Tree: Find maximum depth of binary tree.", example: "Input: [3,9,20,null,null,15,7]. Output: 3" },
      { question: "Same Tree: Check if two binary trees are the same.", example: "Input: p=[1,2,3], q=[1,2,3]. Output: true" },
      { question: "Invert Binary Tree: Invert a binary tree.", example: "Input: [4,2,7,1,3,6,9]. Output: [4,7,2,9,6,3,1]" }
    ],
    medium: [
      { question: "Binary Tree Level Order Traversal: Return level order traversal of tree.", example: "Input: [3,9,20,null,null,15,7]. Output: [[3],[9,20],[15,7]]" },
      { question: "Validate Binary Search Tree: Check if tree is valid BST.", example: "Input: [2,1,3]. Output: true" },
      { question: "Number of Islands: Count number of islands in 2D grid.", example: "Input: grid with 1s(land) and 0s(water). Output: number of islands" }
    ],
    hard: [
      { question: "Binary Tree Maximum Path Sum: Find maximum path sum in binary tree.", example: "Input: [-10,9,20,null,null,15,7]. Output: 42" },
      { question: "Serialize and Deserialize Binary Tree: Design algorithm to serialize/deserialize tree.", example: "Encode tree to string and decode back" },
      { question: "Word Ladder II: Find all shortest transformation sequences.", example: "Input: beginWord='hit', endWord='cog', wordList. Output: all shortest paths" }
    ]
  }
};
