// Online C++ compiler to run C++ program online
#include <iostream>
#include <vector>
#include <bits/stdc++.h>

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

int main() {
  vector<int> ages = {5, 3, 1, 6, 7, 4, 19};

  sort (ages.begin(), ages.end());
  for (int i = 0; i < ages.size(); i++) {
    cout << ages[i] << endl;
  }

  sort(ages.begin(), ages.end(), greater<int>());
  for (int i = 0; i < ages.size(); i++) {
    cout << ages[i] << endl;
  }
  
  return 0;
}