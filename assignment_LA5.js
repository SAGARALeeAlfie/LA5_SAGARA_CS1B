// Simple hash function based on name length
function hash(name) {
  return name.length % 10; // returns a number between 0-9
}

// Initialize hash table with 10 slots
let hashTable = new Array(10).fill(null);

// List of 5 customers
let customers = ["Elaine", "Althea", "Angelo", "Lito", "Engelbert"];
let numberMap = {}; // Maps number (1-based) to hash index

// Store each customer using the hash function
for (let i = 0; i < customers.length; i++) {
  let name = customers[i];
  let index = hash(name);

  // Linear probing in case of collision
  while (hashTable[index] !== null) {
    index = (index + 1) % 10;
  }

  hashTable[index] = name;
  numberMap[i + 1] = index; // Customer number is i + 1
  console.log(`Customer ${name} is assigned number ${i + 1} (stored at index ${index})`);
}

// Start servicing customers
let serviced = 0;

while (serviced < customers.length) {
  let input = prompt("Enter the customer number to be serviced (1-5):");
  let number = parseInt(input);

  if (!numberMap[number]) {
    alert("Invalid or already serviced number.");
    continue;
  }

  let index = numberMap[number];
  let name = hashTable[index];

  if (name) {
    alert(`Now serving: ${name}`);
    hashTable[index] = null; // Remove customer from table
    delete numberMap[number]; // Remove from number map
    serviced++;

    // Display updated hash table in console
    console.log("Updated hash table:");
    console.log(hashTable);
  } else {
    alert("This number has already been serviced.");
  }
}

alert("All customers have been serviced.");
