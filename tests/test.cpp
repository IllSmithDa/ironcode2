// Online C++ compiler to run C++ program online
#include <iostream>
#include <queue>
#include <stack>
#include <map>
#include <vector>

using namespace std;


class Graph {
  public:
    map<string, vector<string>> graphMap;

    void addNode(string val) {
      graphMap[val] = {};
    }

    void addVertices(string node1, string node2) {
      if(graphMap.find(node1) == graphMap.end()) {
        graphMap[node1] = {};
      }
      if(graphMap.find(node2) == graphMap.end()) {
        graphMap[node2] = {};
      }
      graphMap[node1].push_back(node2);
      graphMap[node2].push_back(node1);
    }

    void breadthTraverse (string start) {
      queue<string> newQueue;
      newQueue.push(start);

      map<string, bool> visited;
      visited[start] = true;
      while(newQueue.size() > 0) {
        string val = newQueue.front();
        cout << val << endl;
        newQueue.pop();
        vector<string> tempArr = graphMap[val];
        for (int i = 0; i < tempArr.size(); i++) {
          if (!visited[tempArr[i]]) {
            newQueue.push(tempArr[i]);
            visited[tempArr[i]] = true;
          }
        }
      }
    }

    void depthTraverse (string start) {
      stack<string> newStack;
      newStack.push(start);

      map<string, bool> visited;
      visited[start] = true;
      while(newStack.size() > 0) {
        string val = newStack.top();
        cout << val << endl;
        newStack.pop();
        vector<string> tempArr = graphMap[val];
        for (int i = 0; i < tempArr.size(); i++) {
          if (!visited[tempArr[i]]) {
            newStack.push(tempArr[i]);
            visited[tempArr[i]] = true;
          }
        }
      }
    }
};

int main() {
  Graph newGraph;
  newGraph.addNode("a");
  newGraph.addVertices("a", "b");
  newGraph.addVertices("a", "c");
  newGraph.addVertices("b", "d");
  newGraph.addVertices("b", "e");
  newGraph.addVertices("d", "f");
  newGraph.addVertices("d", "g");
  newGraph.addVertices("d", "h");
  newGraph.addVertices("e", "i");
  newGraph.addVertices("e", "j");
  newGraph.depthTraverse("a");
  newGraph.depthTraverse("a");
  return 0;
}