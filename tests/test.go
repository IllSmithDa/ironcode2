// Online Go compiler to run Golang program online
// Print "Hello World!" message
/*
class User {
  public String first;
  public String last;
  public int age;
  public boolean retired;
  public String[] carBrands;
  
  public User (
    String first,
    String last,
    int age,
    boolean retired,
    String[] carBrands
  ) {
    this.first = first;
    this.last = last;
    this.retired = retired;
    this.carBrands = carBrands;
  }
  
  public String fullName() {
      return String.format("%s %s", first, last);
  }
}

String[] brands = {"Mazda", "Toyota"};
User user = new User (
  "Joe",
  "Doe",
  23,
  false,
  brands
);

System.out.println(user.first);
System.out.println(user.carBrands[1]);
System.out.println(user.fullName());


*/

package main
import "fmt"
// import "math"
type User struct {
  first string
  last string
  age int
  retired bool
  carBrands []string
}

func (usr *User) AddBrands(brands []string) {
  for i := 0; i < len(brands); i++ {
    usr.carBrands = append(usr.carBrands, brands[i]);
  }
}

func main() {
brands := []string{"Mazda", "Toyota"}

user := User {
  "Joe",
  "Doe",
  23,
  false
}
user.AddBrands(brands);

fmt.Println(user.first)
fmt.Println(user.carBrands[1])
fmt.Println(user.fullName())
}