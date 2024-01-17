// Online C++ compiler to run C++ program online
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

/*
function getSum (arr) {
   if (arr.length === 0) return 0;
   const firstVal = arr.shift();
   console.log(firstVal);
   return firstVal + getSum(arr);
}

const testArr = [1, 2, 4, 5]
const sum = getSum(testArr);
console.log(sum);
*/

int getSum (queue<int> arr) {
  if (arr.size() == 0) {
    return 0;
  }
  int firstVal = arr.front();
  arr.pop();
  return firstVal + getSum(arr);
}

int main() {
  queue<int> testArr;
  testArr.push(1);
  testArr.push(2);
  testArr.push(3);
  testArr.push(5);
  int sum = getSum(testArr);
  cout << sum << endl;
  return 0;
}