let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let bal = 0;
    for (let i of this.transactions) {
      bal += i.value;
    }
    return bal;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();

    if (this.account.balance + this.value < 0) {
      console.log('Insufficient funds');
      console.log('CANCELLED: ', this);
      process.exit();
    } else {
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return - this.amount;
  }

}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");


t0 = new Deposit(120.00, myAccount);
t0.commit();
console.log('Transaction 0:', t0);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Withdrawal(60, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
