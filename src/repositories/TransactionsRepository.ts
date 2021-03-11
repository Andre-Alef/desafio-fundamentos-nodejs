import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string;
  value:number;
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface teste{
  total1 : Array<number | undefined>;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    
      return this.transactions;

  }

  public getBalance(): Balance {
  
    let income = 0
    let outcome = 0
    this.transactions.forEach(transaction => {
    if(transaction.type == 'income'){
      income += transaction.value
    }   
    else { 
      outcome += transaction.value
    }
  }
    )
  
    const balance: Balance = {
      income:  income,
      outcome: outcome,
      total: income - outcome
    }

    return balance;


  }

  public create({ title, value, type}: CreateTransactionDTO ): Transaction {
    
    let transaction = new Transaction({title, value, type})

      this.transactions.push(transaction)
  
      return transaction
  }
}

export default TransactionsRepository;
