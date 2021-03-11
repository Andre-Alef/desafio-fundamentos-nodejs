import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async  execute({ title, value, type}: Request): Promise<Transaction> {
    // TODO
    const balance = await this.transactionsRepository.getBalance()
    if(type == 'outcome' && balance.total < value) {
        throw new Error('Saldo insuficiente')
    }
    const transaction= await this.transactionsRepository.create({
       title,
        value,
         type})

    return transaction;
  }
}

export default CreateTransactionService;
