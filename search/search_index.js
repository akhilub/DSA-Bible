var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"DSA-Bible","text":"<p>Welcome to my collection of DSA problems solutions!</p> <p>This site contains detailed explanations and implementations of various algorithms through LeetCode problems.</p>"},{"location":"index.html#problem-categories","title":"Problem Categories","text":"<ul> <li>Array</li> <li>Hash Table</li> <li>Dynamic Programming</li> <li>Tree</li> <li>Graph</li> <li>and more...</li> </ul>"},{"location":"index.html#latest-solutions","title":"Latest Solutions","text":""},{"location":"index.html#apr-12-2025","title":"Apr 12, 2025","text":"<ul> <li>Web App is now PWA</li> <li>Significant improvement on focus, redeability</li> </ul>"},{"location":"index.html#apr-11-2025","title":"Apr 11, 2025","text":"<ul> <li>Added CI/CD for auto deployment</li> </ul>"},{"location":"index.html#apr-10-2025","title":"Apr 10, 2025","text":"<ul> <li>746. Min Cost Climbing Stairs</li> </ul>"},{"location":"index.html#apr-8-2025","title":"Apr 8, 2025","text":"<ul> <li>135. Candy</li> </ul>"},{"location":"index.html#apr-5-2025","title":"Apr 5, 2025","text":"<ul> <li>2226. Maximum Candies Allocated to K Children</li> </ul>"},{"location":"index.html#apr-4-2025","title":"Apr 4, 2025","text":"<ul> <li>1. Two Sum</li> <li>2. Add Two Number</li> </ul>"},{"location":"problems/1.html","title":"1. Two Sum","text":"<p>ArrayHash Table</p>","tags":["Array","Hash Table"]},{"location":"problems/1.html#1-two-sum","title":"1. Two Sum","text":"<p>Easy</p>","tags":["Array","Hash Table"]},{"location":"problems/1.html#description","title":"Description","text":"<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p> <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p> <p>You can return the answer in any order.</p> <p>Example 1:</p> <pre><code>Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n</code></pre> <p>Example 2:</p> <pre><code>Input: nums = [3,2,4], target = 6\nOutput: [1,2]\n</code></pre> <p>Example 3:</p> <pre><code>Input: nums = [3,3], target = 6\nOutput: [0,1]\n</code></pre> <p>Constraints:</p> <ul> <li><code>2 &lt;= nums.length &lt;= 104</code></li> <li><code>-109 &lt;= nums[i] &lt;= 109</code></li> <li><code>-109 &lt;= target &lt;= 109</code></li> <li><code>Only one valid answer exists.</code></li> </ul> <p>Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?</p>","tags":["Array","Hash Table"]},{"location":"problems/1.html#solutions","title":"Solutions","text":"","tags":["Array","Hash Table"]},{"location":"problems/1.html#approach-1-hash-table","title":"Approach 1: Hash Table","text":"<p> Time complexity: O(n)</p> <p> Space complexity: O(n)</p> <p>Notes</p> <p>We can use the hash table <code>seen</code> to store the array value and the corresponding index.</p> <p>Traverse the array <code>nums</code>, when you find <code>target - nums[i]</code> in the hash table, it means that the target value is found, and the index of <code>target - nums[i]</code> and <code>i</code> are returned.</p> <p>The time complexity is <code>O(n)</code> and the space complexity is <code>O(n)</code>. Where <code>n</code>is the length of the array nums.</p> PythonJavaC++GoTypeScriptRustJavaScriptC#PHPScalaSwiftRubyKotlinNimCangjie <pre><code>class Solution:\n    def twoSum(self, nums: List[int], target: int) -&gt; List[int]:\n        seen = {} #map elements with their indexs {ele:idx}\n        for idx,ele in enumerate(nums):\n            num = target - ele\n            if num in seen:\n                return [seen[num],idx]\n            seen[ele] = idx\n</code></pre> <pre><code>class Solution {\n    public int[] twoSum(int[] nums, int target) {\n    }\n}\n</code></pre> <pre><code>class Solution {\npublic:\n    vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) {\n\n    }\n};\n</code></pre> <pre><code>func twoSum(nums []int, target int) []int {\n}\n</code></pre> <pre><code>function twoSum(nums: number[], target: number): number[] {\n    const seen = new Map();\n\n    for (let i = 0;i &lt; nums.length; i++){\n        const diff = target - nums[i]\n\n        if (seen.has(diff)){\n            return [seen.get(diff),i]\n        }\n\n    seen.set(nums[i],i)\n    }\n\n}\n</code></pre> <pre><code>impl Solution {\n    pub fn two_sum(nums: Vec&lt;i32&gt;, target: i32) -&gt; Vec&lt;i32&gt; {\n\n    }\n}\n</code></pre> <pre><code>/**\n* @param {number[]} nums\n* @param {number} target\n* @return {number[]}\n*/\nvar twoSum = function (nums, target) {}\n</code></pre> <pre><code>public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n    }\n}\n</code></pre> <pre><code>class Solution {\n    /**\n    * @param Integer[] $nums\n    * @param Integer $target\n    * @return Integer[]\n    */\n    function twoSum($nums, $target) {\n    }\n}\n</code></pre> <pre><code>object Solution {\n    def twoSum(nums: Array[Int], target: Int): Array[Int] = {\n    }\n}\n</code></pre> <pre><code>class Solution {\n    func twoSum(_ nums: [Int], _ target: Int) -&gt; [Int] {\n\n    }\n}\n</code></pre> <pre><code># @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer[]}\ndef two_sum(nums, target)\n\nend\n</code></pre> <pre><code>class Solution {\n    fun twoSum(nums: IntArray, target: Int): IntArray {\n\n    }\n}\n</code></pre> <pre><code>proc twoSum(nums: seq[int], target: int): seq[int] =\n</code></pre> <pre><code>class Solution {\n    func twoSum(nums: Array&lt;Int64&gt;, target: Int64): Array&lt;Int64&gt; {\n\n    }\n}\n</code></pre>","tags":["Array","Hash Table"]},{"location":"problems/135.html","title":"135. Candy","text":"<p>ArrayGreedy</p>","tags":["Array","Greedy"]},{"location":"problems/135.html#135-candy","title":"135. Candy","text":"<p>Hard</p>","tags":["Array","Greedy"]},{"location":"problems/135.html#description","title":"Description","text":"<p>There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.</p> <p>You are giving candies to these children subjected to the following requirements:</p> <pre><code>- Each child must have at least one candy.\n- Children with a higher rating get more candies than their neighbors.\n</code></pre> <p>Return the minimum number of candies you need to have to distribute the candies to the children.</p> <p>Example 1:</p> <pre><code>Input: ratings = [1,0,2]\nOutput: 5\nExplanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.\n</code></pre> <p>Example 2:</p> <pre><code>Input: ratings = [1,2,2]\nOutput: 4\nExplanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.\nThe third child gets 1 candy because it satisfies the above two conditions.\n</code></pre> <p>Constraints:</p> <ul> <li><code>n == ratings.length</code></li> <li><code>1 &lt;= n &lt;= 2 * 104</code></li> <li><code>0 &lt;= ratings[i] &lt;= 2 * 104</code></li> </ul>","tags":["Array","Greedy"]},{"location":"problems/135.html#solutions","title":"Solutions","text":"","tags":["Array","Greedy"]},{"location":"problems/135.html#approach-greedy","title":"Approach: Greedy","text":"<p> Time complexity:O(n)</p> <p> Space complexity: O(n)</p>","tags":["Array","Greedy"]},{"location":"problems/135.html#way-1","title":"Way 1:","text":"<p>Algorithmic Way</p> <p>We initialize a <code>candies</code> array with 1 candy for each child.</p> <p>First, we go left to right: if a child has a higher rating than the one before, they get one more candy.</p> <p>Then, we go right to left: if a child has a higher rating than the one after, we ensure they have more candies by taking the max of current and one more than the next.</p> <p>Finally, we sum all <code>candies</code> and return the total.</p> <p>Time complexity <code>O(n)</code> , Space complexity <code>O(n)</code>.Where n is the number of children.</p> Python <pre><code>class Solution:\n    def candy(self, ratings: List[int]) -&gt; int:\n        n = len(ratings)\n        candies = [1] * n\n        # Left to right pass\n        for i in range(1, n):\n            if ratings[i] &gt; ratings[i - 1]:\n                candies[i] = candies[i - 1] + 1\n        # Right to left pass\n        for i in range(n - 2, -1, -1):\n            if ratings[i] &gt; ratings[i + 1]:\n                candies[i] = max(candies[i], candies[i + 1] + 1)\n        return sum(candies)\n</code></pre>","tags":["Array","Greedy"]},{"location":"problems/135.html#way-2","title":"Way 2:","text":"<p>Notes</p> <p>We initialize two arrays <code>L</code> and <code>R</code>, where <code>L[i]</code> represents the minimum number of candies the current child should get when the current child's score is higher than the left child's score, and <code>R[i]</code> represents the minimum number of candies the current child should get when the current child's score is higher than the right child's score. Initially, <code>L[i]</code> = 1, <code>R[i]</code> = 1.</p> <p>We traverse the array from left to right once, and if the current child's score is higher than the left child's score, then <code>L[i] = L[i - 1] + 1</code>;</p> <p>Similarly, we traverse the array from right to left once, and if the current child's score is higher than theright child's score, then <code>R[i] = R[i+1] + 1</code>. Finally, we traverse the array of scores once, and the minimum number of candies each child should get is the maximum of <code>L[i]</code> and <code>R[i]</code>, and we add them up to get the answer.</p> <p>Time complexity <code>O(n)</code>, space complexity <code>O(n)</code>. Where <code>n</code> is the length of the array of scores.</p> Python <pre><code>class Solution:\n    def candy(self, ratings: List[int]) -&gt; int:\n        n = len(ratings)\n        L = [1]*n\n        R = [1]*n\n        ans = 0\n        for i in range(1,n):\n            if ratings[i]&gt;ratings[i-1]:\n                L[i] = L[i-1] +1\n\n        for i in range(n-2,-1,-1):\n            if ratings[i]&gt;ratings[i+1]:\n                R[i] = R[i+1] + 1\n\n        for l,r in zip(L,R):\n            ans+=max(l,r)\n\n        return ans\n</code></pre>","tags":["Array","Greedy"]},{"location":"problems/2.html","title":"2. Add Two Numbers","text":"<p>Linked ListMathRecursion</p>","tags":["Linked List","Math","Recursion"]},{"location":"problems/2.html#2-add-two-numbers","title":"2. Add Two Numbers","text":"<p>Medium</p>","tags":["Linked List","Math","Recursion"]},{"location":"problems/2.html#description","title":"Description","text":"<p>You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p> <p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p> <p>Example 1:</p> <p></p> <pre><code>Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n</code></pre> <p>Example 2:</p> <pre><code>Input: l1 = [0], l2 = [0]\nOutput: [0]\n</code></pre> <p>Example 3:</p> <pre><code>Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\nOutput: [8,9,9,9,0,0,0,1]\n</code></pre> <p>Constraints:</p> <ul> <li><code>The number of nodes in each linked list is in the range [1, 100].</code></li> <li><code>0 &lt;= Node.val &lt;= 9</code></li> <li><code>It is guaranteed that the list represents a number that does not have leading zeros.</code></li> </ul>","tags":["Linked List","Math","Recursion"]},{"location":"problems/2.html#solutions","title":"Solutions","text":"","tags":["Linked List","Math","Recursion"]},{"location":"problems/2.html#approach-1-simulation","title":"Approach 1: Simulation","text":"<p> Time complexity: O(max((M,N)))</p> <p> Space complexity: O(1)</p> <p>Notes</p> <p>We traverse two linked lists and at the same time, and use the variable <code>carry</code> to indicate whether there is a carry.</p> <p>Each time we traverse, we take out the current bit of the corresponding linked list, calculate the sum with the carry <code>carry</code>, and then update the value of the carry. Then we add the current bit to the answer linked list.</p> <p>If both linked lists are traversed, and the carry is 0, the traversal ends.</p> <p>Finally, we return the head node of the answer linked list.</p> <p>The time complexity is <code>O(max((M,N)))</code>, where <code>M</code> and <code>N</code> are the lengths of the two linked lists. We need to traverse the entire position of the two linked lists, and each position only needs <code>O(1)</code> time. Ignoring the space consumption of the answer, the space complexity is <code>O(max((M,N)))</code>.</p> PythonJavaC++GoTypeScriptRustJavaScriptC#PHPSwiftRuby <pre><code># Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -&gt; Optional[ListNode]:\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n        while l1 or l2 or carry:\n            if l1:\n                carry+=l1.val\n                l1 = l1.next\n            if l2:\n                carry+=l2.val\n                l2 = l2.next\n            curr.next = ListNode(carry%10)\n            carry = carry//10\n            curr = curr.next\n        return dummy.next\n</code></pre> <pre><code>class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    }\n}\n</code></pre> <pre><code>class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n\n    }\n};\n</code></pre> <pre><code>func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n}\n</code></pre> <pre><code>function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n}\n</code></pre> <pre><code>impl Solution {\n    pub fn add_two_numbers(\n    mut l1: Option&lt;Box&lt;ListNode&gt;&gt;,\n    mut l2: Option&lt;Box&lt;ListNode&gt;&gt;,\n) -&gt; Option&lt;Box&lt;ListNode&gt;&gt; {\n\n    }\n}\n</code></pre> <pre><code>/**\n* @param {ListNode} l1\n* @param {ListNode} l2\n* @return {ListNode}\n*/\nvar addTwoNumbers = function (l1, l2) {\n\n}\n</code></pre> <pre><code>public class Solution {\n    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {\n    }\n}\n</code></pre> <pre><code>class Solution {\n    /**\n    * @param ListNode $l1\n    * @param ListNode $l2\n    * @return ListNode\n    */\n    function addTwoNumbers($l1, $l2) {\n    }\n}\n</code></pre> <pre><code>class Solution {\n    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -&gt; ListNode? {\n\n    }\n}\n</code></pre> <pre><code># @param {ListNode} l1\n# @param {ListNode} l2\n# @return {ListNode}\ndef add_two_numbers(l1, l2)\n\nend\n</code></pre>","tags":["Linked List","Math","Recursion"]},{"location":"problems/20.html","title":"20. Valid Parentheses","text":"<p>StringStack</p>","tags":["String","Stack"]},{"location":"problems/20.html#20-valid-parentheses","title":"20. Valid Parentheses","text":"<p>Easy</p>","tags":["String","Stack"]},{"location":"problems/20.html#description","title":"Description","text":"<p>Given a string s containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p> <p>An input string is valid if:</p> <ol> <li>Open brackets must be closed by the same type of brackets.</li> <li>Open brackets must be closed in the correct order.</li> <li>Every close bracket has a corresponding open bracket of the same type.</li> </ol> <p>Example 1:</p> <pre><code>Input: s = \"()\"\n\nOutput: true\n</code></pre> <p>Example 2:</p> <pre><code>Input: s = \"()[]{}\"\n\nOutput: true\n</code></pre> <p>Example 3:</p> <pre><code>Input: s = \"(]\"\n\nOutput: false\n</code></pre> <p>Example 4:</p> <pre><code>Input: s = \"([])\"\n\nOutput: true\n</code></pre> <p>Constraints:</p> <ul> <li><code>1 &lt;= s.length &lt;= 104</code></li> <li><code>s consists of parentheses only '()[]{}'</code></li> </ul>","tags":["String","Stack"]},{"location":"problems/20.html#solutions","title":"Solutions","text":"","tags":["String","Stack"]},{"location":"problems/20.html#approach-stack","title":"Approach: Stack","text":"<p> Time complexity: \\(O(n)\\)</p> <p> Space complexity: \\(O(n)\\)</p>","tags":["String","Stack"]},{"location":"problems/20.html#way-1","title":"Way 1:","text":"<p>Algorithmic Way</p> <p>Traverse the bracket string <code>s</code>.</p> <ul> <li> <p>When encountering a left bracket, push the current left bracket into the stack;</p> </li> <li> <p>When encountering a right bracket, pop the top element of the stack (if the stack is empty, directly return false), and judge whether it matches. If it does not match, directly return false.</p> </li> </ul> <p>At the end of the traversal,</p> <ul> <li>if the stack is empty, it means the bracket string is valid, return true; otherwise, return false.</li> </ul> <p>The time complexity is O(n), and the space complexity is O(n). Here, n is the length of the bracket string .</p> Python <pre><code>class Solution:\n    def isValid(self, s: str) -&gt; bool:\n        stack = []\n        valid = [\"()\",\"{}\",\"[]\"]         # valid = {'()', '[]', '{}'}\n\n        for ch in s:\n            if ch in '({[':\n                stack.append(ch)\n            elif not stack or not (stack.pop() + ch in valid):\n                return False\n        return not stack\n</code></pre>","tags":["String","Stack"]},{"location":"problems/20.html#way-2","title":"Way 2:","text":"<p>Using a dictionary or hashMap</p> PythonTypeScriptJavaScript <pre><code>class Solution:\n    def isValid(self, s: str) -&gt; bool:\n        mp = {\n            '(':')',\n            '[':']',\n            '{':'}'\n        }\n\n        for ch in s:\n            if ch in mp:\n                stk.append(mp[ch])\n            elif not stk or stk.pop()!=ch:\n                return False\n\n        return len(stk)==0\n</code></pre> <pre><code>function isValid(s: string): boolean {\n    const mp = new Map([\n        ['(', ')'],\n        ['[', ']'],\n        ['{', '}'],\n    ]);\n\n    const stack = [];\n\n    for (const c of s) {\n        if (mp.has(c)) {\n            stack.push(mp.get(c));\n        } else if (stack.pop() !== c) {\n            return false;\n        }\n    }\n    return stack.length === 0;\n}\n</code></pre> <pre><code>/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    let stk = []\n    const mp = {'(':')','[':']','{':'}'}\n\n    for (const ch of s){\n        if(ch in mp) {\n            stk.push(mp[ch])\n        }\n        else if (stk.length === 0 || stk.pop()!==ch) {\n            return false\n        }\n    }\n    return stk.length == 0\n};\n</code></pre> What is the difference between HashMap and HashTable in JavaScript? <p>Both Hash Tables and Hashmap provide a key/value functionality but there is a slight difference. Hashmap offers the ability of the keys to be of any data type, unlike Hash Tables where the keys can only be integers and strings. Also, Hashmaps can not be converted to JSON.</p> <p>Read more</p>","tags":["String","Stack"]},{"location":"problems/2226.html","title":"2226. Maximum Candies Allocated to K Children","text":"<p>ArrayBinary Search</p>","tags":["Array","Binary Search"]},{"location":"problems/2226.html#2226-maximum-candies-allocated-to-k-children","title":"2226. Maximum Candies Allocated to K Children","text":"<p>Medium</p>","tags":["Array","Binary Search"]},{"location":"problems/2226.html#description","title":"Description","text":"<p>You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile into any number of sub piles, but you cannot merge two piles together.</p> <p>You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. Each child can be allocated candies from only one pile of candies and some piles of candies may go unused.</p> <p>Return the maximum number of candies each child can get.</p> <p>Example 1:</p> <pre><code>Input: candies = [5,8,6], k = 3\nOutput: 5\nExplanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.\n</code></pre> <p>Example 2:</p> <pre><code>Input: candies = [2,5], k = 11\nOutput: 0\nExplanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.\n</code></pre> <p>Constraints:</p> <ul> <li><code>1 &lt;= candies.length &lt;= 105</code></li> <li><code>1 &lt;= candies[i] &lt;= 107</code></li> <li><code>1 &lt;= k &lt;= 1012</code></li> </ul>","tags":["Array","Binary Search"]},{"location":"problems/2226.html#solutions","title":"Solutions","text":"","tags":["Array","Binary Search"]},{"location":"problems/2226.html#approach-1-applied-binary-search","title":"Approach 1: Applied Binary Search","text":"<p> Time complexity: O(nxlog M)</p> <p> Space complexity: O(1)</p> <p>Notes</p> <p>We notice that if each child can receive v candies, then for any v' &lt; v, each child can also receive v' candies. Therefore, we can use binary search to find the maximum v such that each child can receive v candies. We define the left boundary of the binary search as l = 0 and the right boundary as r = max(candies), where max(candies) represents the maximum value in the array candies. During the binary search, we take the middle value mid = (l+r+1)//2 = \u230a(l+r+1)/2\u230b each time, and then calculate the total number of candies each child can receive.</p> <p>If the total is greater than or equal to k, it means each child can receive v candies, so we update the left boundary l = mid. Otherwise, we update the right boundary r = mid - 1. Finally, when l = r, we have found the maximum v. The time complexity is O(nxlog M), where n is the length of the array candies, and M is the maximum value in the array candies. The space complexity is O (1).</p>","tags":["Array","Binary Search"]},{"location":"problems/2226.html#way-1","title":"Way 1:","text":"Python <pre><code>class Solution:\n    def maximumCandies(self, candies: List[int], k: int) -&gt; int:\n        def f(mid):                     #f - numChildren is a function of candies\n            return sum((c//mid) for c in candies)\n\n        l, r = 1, max(candies)\n        ans = 0\n        while l &lt;=r:\n            mid = (l + r ) // 2\n            if f(mid)&gt;=k:\n                ans = mid\n                l = mid +1\n            else:\n                r = mid -1\n        return ans\n</code></pre>","tags":["Array","Binary Search"]},{"location":"problems/2226.html#way-2","title":"Way 2:","text":"<p>Tip</p> <ul> <li>Binary Search different than the regular one</li> <li>Problem function is monotonically decresing and we are looking for maximum</li> </ul> Python <pre><code>class Solution:\n    def maximumCandies(self, candies: List[int], k: int) -&gt; int:\n        def f(mid):                    #f - numChildren is a function of candies\n            return sum((c//mid) for c in candies)\n\n        l, r = 0, max(candies)\n        while l&lt;r:\n            mid = (l + r +1) &gt;&gt; 1      #see deviation here from regular binary search\n            if f(mid) &gt;= k:\n                l = mid                #see deviation here from regular binary search\n            else:\n                r = mid - 1            #see deviation here from regular binary search\n        return l\n</code></pre>","tags":["Array","Binary Search"]},{"location":"problems/746.html","title":"746. Min Cost Climbing Stairs","text":"<p>ArrayDynamic Programming</p>","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#746-min-cost-climbing-stairs","title":"746. Min Cost Climbing Stairs","text":"<p>Easy</p>","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#description","title":"Description","text":"<p>You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.</p> <p>You can either start from the step with index 0, or the step with index 1.</p> <p>Return the minimum cost to reach the top of the floor.</p> <p>Example 1:</p> <pre><code>Input: cost = [10,15,20]\nOutput: 15\nExplanation: You will start at index 1.\n- Pay 15 and climb two steps to reach the top.\nThe total cost is 15.\n</code></pre> <p>Example 2:</p> <pre><code>Input: cost = [1,100,1,1,1,100,1,1,100,1]\nOutput: 6\nExplanation: You will start at index 0.\n- Pay 1 and climb two steps to reach index 2.\n- Pay 1 and climb two steps to reach index 4.\n- Pay 1 and climb two steps to reach index 6.\n- Pay 1 and climb one step to reach index 7.\n- Pay 1 and climb two steps to reach index 9.\n- Pay 1 and climb one step to reach the top.\nThe total cost is 6.\n</code></pre> <p>Constraints:</p> <ul> <li><code>2 &lt;= cost.length &lt;= 1000</code></li> <li><code>0 &lt;= cost[i] &lt;= 999</code></li> </ul>","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#solutions","title":"Solutions","text":"","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#approach-functional-relationship","title":"Approach: Functional Relationship","text":"<p> Time complexity: O(n)</p> <p> Space complexity: O(n)</p>","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#way-1","title":"Way 1:","text":"<p>Top Down DP via inbuilt library</p> <p>We define <code>f(i)</code> as the minimum cost required to reach the <code>i-th</code> step,</p> <p>Initially <code>f(0) = f(1) = 0</code>. The answer is <code>f(n)</code>.</p> <p>When <code>i \u2265 2</code>, we can directly reach the ith step from the <code>(i - 1)th</code> step using 1 step, or reach the ith step from the <code>(i - 2)th</code> step using 2 steps. Therefore, we have the state transition equation:   <code>f(i) = min(f(i - 1) + cost[i - 1], f(i - 2) + cost[i - 2])</code></p> <p>The final answer is <code>f(n)</code>.</p> <p>The time complexity is <code>O(n)</code>, and the space complexity is <code>O(n)</code>. Here, <code>n</code> is the length of the cost array.</p> Python <pre><code>class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -&gt; int:\n        n = len(cost)\n        @cache\n        def f(i):\n            if i==0:\n                return 0\n            if i==1:\n                return 0\n            return min(cost[i-1]+f(i-1), cost[i-2]+f(i-2))\n        return f(n)\n</code></pre> Top Down DP(Recursion+Memoization) Python <pre><code>class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -&gt; int:\n        n = len(cost)\n        def f(i,nb={}):\n            if i==0:\n                return 0\n            if i==1:\n                return 0\n\n            if i in nb:\n                return nb[i]\n\n            nb[i] = min(cost[i-1]+f(i-1), cost[i-2]+f(i-2))\n\n            return nb[i]\n\n        return f(n)\n</code></pre>","tags":["Array","Dynamic Programming"]},{"location":"problems/746.html#way-2","title":"Way 2:","text":"<p> Time complexity: O(n)</p> <p> Space complexity: O(1)</p> <p>No-memory DP</p> <ul> <li>We notice that f(i) in the state transition equation is only related to f(i \u2014 1) and f(i - 2)</li> <li>Therefore, we can use two variables f0 and f1 to alternately record the values of f(i - 2) and f(i - 1), which optimizes the space complexity to O(1).</li> </ul> Python <pre><code>class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -&gt; int:\n        #Inital states\n        n = len(cost)\n        f0 , f1 = 0 , 0\n        for i in range(2,n+1):\n            fi = min(f1+cost[i-1], f0+cost[i-2])\n            f0 , f1 = f1 , fi\n        return fi\n</code></pre> Bottom Up DP- Tabulation Python <pre><code>class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -&gt; int:\n        #Inital states\n        n = len(cost)\n        dp = [0,0]+[0]*(n-1)\n\n        for i in range(2,n+1):\n            dp[i] = min(cost[i-1]+dp[i-1],cost[i-2]+dp[i-2])\n\n        return dp[n]\n</code></pre>","tags":["Array","Dynamic Programming"]}]}