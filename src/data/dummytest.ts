export const dummyData = [
  {
    language: 'C++',
    concept: 'print_text',
    text: `
#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}
`  
  },
  {
    language: 'JavaScript',
    concept: 'print_text',
    text: `console.log('Hello World!');
console.log("Hello World!");
    `  
  },
  {
    language: 'Python',
    concept: 'print_text',
    text: `print('Hello World!')
print("Hello World!")
    `  
  },
  {
    language: 'Java',
    concept: 'print_text',
    text: `class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
    `  
  },
  {
    language: 'C#',
    concept: 'print_text',
    text: `using System;

public class HelloWorld {
  public static void Main(String[] args) {
    Console.WriteLine("Hello World!");
  }
}
    `  
  },
  {
    language: 'C',
    concept: 'print_text',
    text: `#include <stdio.h>
int main() {
  printf("Hello world");
  return 0;
}
    `  
  },
]
