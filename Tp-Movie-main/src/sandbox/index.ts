console.log("hello ts");

type Role = "dev" | "admin";

//role inféré à Role
const role = "dev";

// let role = "dev"; role inféré à string
function setRole(r: Role) {}

setRole(role);

function isPrime(n: number) {
    if(n === 2) return true
    if (n % 2 === 0 || n < 2) return false

    let i = 3;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0) return false
        i = i + 2;
    }

    return true
}

function specialPrime(num: number) {
  let tab:number[] = [];
  let count = 0;
  for(let i = 0; i < num; i++) {
    if(isPrime(i)) tab.push(i);
  }
  let list = num.toString().split("").map(Number);
  for(let i = 0; i< list.length; i++) {
    count *= list[i];
  }
  if (count === tab[tab.length - 1]) return true
}
// console.log(specialPrime(3));

Exo inférence :

const n = 10; // 10
let s = "hello"; //string
const arr = [1, 2, 3]; //number[]
const mixed = [1, "a"]; //number[] | string[]
const user = { id: 1, name: "Ada" }; // id: number name: string

Exo inférence 2:

Aucune inférence
