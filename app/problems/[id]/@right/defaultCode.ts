export const defaultCode = {
    javascript: `function solution() {
    // Write your JavaScript code here
    
  }`,
    typescript: `function solution(): void {
    // Write your TypeScript code here
    
  }`,
    python: `def solution():
      # Write your Python code here
      pass`,
    java: `public class Solution {
      public static void main(String[] args) {
          // Write your Java code here
      }
  }`,
    c: `#include <stdio.h>
  
  int solution() {
      // Write your C code here
      return 0;
  }`,
  }
  
  export type Language = keyof typeof defaultCode