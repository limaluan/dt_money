import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  const { createTransaction } = useTransactions();

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type
    })

    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >

      <button type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container
        onSubmit={handleFormSubmit}
      >
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer >
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor='green'
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor='red'
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Entrada" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  );
}
