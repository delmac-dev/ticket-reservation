class Queue {
    constructor() {
        this.items = []; // Array to store queue elements
    }

    populate(items){
        this.items = items;
    }

    // Method to add an element to the queue
    enqueue(element) {
        this.items.push(element); // Add the element to the end of the queue
    }

    // Method to remove and return the first element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return null; // Return error message if queue is empty
        }
        return this.items.shift(); // Remove and return the first element from the queue
    }

    // Method to return the first element from the queue without removing it
    front() {
        if (this.isEmpty()) {
            return null; // Return error message if queue is empty
        }
        return this.items[0]; // Return the first element from the queue
    }

    // Method to check if the queue is empty
    isEmpty() {
        return this.items.length === 0; // Return true if queue is empty, false otherwise
    }

    // Method to return the size of the queue
    size() {
        return this.items.length; // Return the number of elements in the queue
    }

    // Method to print the elements of the queue
    print() {
        let str = "";
        for (let i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        }
        return str.trim(); // Return a string representation of the elements in the queue
    }
}


export default Queue;