// Print "Hello World!" message
use std::collections::HashMap;
struct LinkedList {
  graphMap:HashMap<String, Vec<String>>
}

impl LinkedList {
  fn new() -> LinkedList {
    let graphMap = HashMap::new();
    LinkedList {
      graphMap
    }
  }
  
  fn add(mut self, value:String) {
    let empty: Vec<String> = vec![];
    self.graphMap.insert(
      value,
      empty
    );
  }
  
  fn addVertices(
    mut self,
    node1:String,
    node2:String) {
    
    if self.graphMap.contains_key(&node1) == false {
      let empty: Vec<String> = vec![];
      self.graphMap.insert(node1, empty);
    }
    
    if self.graphMap.contains_key(&node2) == false {
      let empty: Vec<String> = vec![];
      self.graphMap.insert(node2, empty);
    }
    
    let arr1 = self.graphMap.get(&node1).unwrap();
    let arr2 = self.graphMap.get(&node2).unwrap();
    arr1.push(node2);
    arr2.push(node1);
  }
}
fn main() {
    println!("Hello, World!");
}


use std::rc::Rc;
use std::cell::RefCell;

#[derive(Clone)]
struct Node {
    value: String,
    next: Option<Rc<RefCell<Node>>>,
}

impl Node {
    fn new(value: String) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Node {
            value,
            next: None,
        }))
    }
}

struct LinkedList {
  head: Option<Rc<RefCell<Node>>>,
}

impl LinkedList {
  fn new() -> Self {
    LinkedList { head: None }
  }

  fn add_value(&mut self, val: String) {
    let new_node = Node::new(val);
    match self.head {
      Some(ref head) => {
        let mut current = head.clone();
        println!("{:?}", current.borrow().next.clone());
        // while let Some(next) = current.borrow().next.clone() {
        //   current = next;
        // }
        // current.borrow_mut().next = Some(new_node);
      }
      None => {
         self.head = Some(new_node);
      }
    }
  }

    // fn return_head(&self) -> Option<String> {
    //   self.head.as_ref().map(|node| node.borrow().value.clone())
    // }

    fn traverse(&self) {
        let mut current = self.head.clone();
        while let Some(node) = current {
            println!("{}", node.borrow().value);
            current = node.borrow().next.clone();
        }
    }
}

fn main() {
    let mut car_list = LinkedList::new();
    car_list.add_value("Mazda".to_string());
    car_list.add_value("Toyota".to_string());
    car_list.add_value("Honda".to_string());

    // if let Some(head_value) = car_list.return_head() {
    //     println!("{}", head_value);
    // }
    car_list.traverse();
}

struct Node<T> {
    data: T,
    next: Option<Box<Node<T>>>,
}

// Define a LinkedList struct to manage the linked list
pub struct LinkedList<T> {
    head: Option<Box<Node<T>>>,
}

impl<T> LinkedList<T> {
    // Create an empty linked list
    pub fn new() -> Self {
        Self { head: None }
    }

    // Insert a new element at the front of the linked list
    pub fn push(&mut self, data: T) {
        let new_node = Box::new(Node {
            data: data,
            next: self.head.take(),
        });
        self.head = Some(new_node);
    }

    // Remove and return the first element from the linked list
    pub fn pop(&mut self) -> Option<T> {
        self.head.take().map(|mut node| {
            self.head = node.next.take();
            node.data
        })
    }

    // Check if the linked list is empty
    pub fn is_empty(&self) -> bool {
        self.head.is_none()
    }

    // Print the elements of the linked list
    pub fn display(&self) {
        let mut current = &self.head;
        print!("LinkedList: ");
        while let Some(node) = current {
            print!("{:?} ", node.data);
            current = &node.next;
        }
        println!();
    }
}

fn main() {
    let mut list: LinkedList<i32> = LinkedList::new();
    list.push(1);
    list.push(2);
    list.push(3);
    list.display(); // Output: LinkedList: 3 2 1
    list.pop();
    list.display(); // Output: LinkedList: 2 1
}