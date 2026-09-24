export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

export const PROBLEMS = [
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'EASY',
    tags: ['Math', 'Basics'],
    description:
      'Given two integers a and b, print their sum a + b. Input is given as a single line containing the two integers separated by a space.'
    ,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5.' },
      { input: '10 -4', output: '6', explanation: '10 + (-4) = 6.' }
    ],
    constraints: [
      '-10\u2079 \u2264 a, b \u2264 10\u2079'
    ],
    starterCode: {
      PYTHON: `nums = list(map(int, input().split()))
print(nums[0] + nums[1])
`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}
`,
      CPP: `#include <iostream>

int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
    return 0;
}
`,
      JAVASCRIPT: `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const [a, b] = line.trim().split(/\\s+/).map(Number);
  console.log(a + b);
  rl.close();
});
`
    },
    judgeTestCases: [
      { input: '2 3', expectedOutput: '5' },
      { input: '10 -4', expectedOutput: '6' },
      { input: '-100 100', expectedOutput: '0' },
      { input: '123456789 987654321', expectedOutput: '1111111110' }
    ]
  },
  {
    id: 'largest-number',
    title: 'Largest Number in Array',
    difficulty: 'EASY',
    tags: ['Arrays'],
    description:
      'Given N integers on a single line, print the largest number in the sequence.'
    ,
    examples: [
      { input: '5\n3 9 1 7 2', output: '9', explanation: 'The maximum of [3, 9, 1, 7, 2] is 9.' },
      { input: '1\n-5', output: '-5', explanation: 'A single element is trivially the maximum.' }
    ],
    constraints: [
      '1 \u2264 N \u2264 10\u2075',
      '-10\u2079 \u2264 element \u2264 10\u2079'
    ],
    starterCode: {
      PYTHON: `n = int(input())
arr = list(map(int, input().split()))
print(max(arr))
`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            max = Math.max(max, sc.nextInt());
        }
        System.out.println(max);
    }
}
`,
      CPP: `#include <iostream>
#include <climits>

int main() {
    int n, x, mx = INT_MIN;
    std::cin >> n;
    while (n--) {
        std::cin >> x;
        mx = std::max(mx, x);
    }
    std::cout << mx << std::endl;
    return 0;
}
`,
      JAVASCRIPT: `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const n = Number(lines[0]);
  const arr = lines[1].trim().split(/\\s+/).map(Number);
  console.log(Math.max(...arr));
});
`
    },
    judgeTestCases: [
      { input: '5\n3 9 1 7 2', expectedOutput: '9' },
      { input: '1\n-5', expectedOutput: '-5' },
      { input: '4\n100 200 300 150', expectedOutput: '300' },
      { input: '6\n0 -1 -2 -3 -4 -5', expectedOutput: '0' }
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'EASY',
    tags: ['Strings'],
    description:
      'Given a string S on a single line, print its reverse.'
    ,
    examples: [
      { input: 'codearena', output: 'aneraedoc', explanation: 'Reversed characters of "codearena".' },
      { input: 'abc', output: 'cba', explanation: 'Reversed characters of "abc".' }
    ],
    constraints: [
      '1 \u2264 |S| \u2264 10\u2075',
      'S consists of lowercase English letters'
    ],
    starterCode: {
      PYTHON: `s = input().strip()
print(s[::-1])
`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(new StringBuilder(s).reverse());
    }
}
`,
      CPP: `#include <iostream>
#include <algorithm>

int main() {
    std::string s;
    std::getline(std::cin, s);
    std::reverse(s.begin(), s.end());
    std::cout << s << std::endl;
    return 0;
}
`,
      JAVASCRIPT: `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  console.log(line.split('').reverse().join(''));
  rl.close();
});
`
    },
    judgeTestCases: [
      { input: 'codearena', expectedOutput: 'aneraedoc' },
      { input: 'abc', expectedOutput: 'cba' },
      { input: 'a', expectedOutput: 'a' },
      { input: 'madam', expectedOutput: 'madam' }
    ]
  }
];