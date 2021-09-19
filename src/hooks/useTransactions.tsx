import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

interface TransactionType {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionProviderProps {
    children: ReactNode
}

type CreationTransactionType = Omit<TransactionType, 'id' | 'createdAt'>;

interface TransactionContextData {
    transactions: TransactionType[];
    createTransaction: (transaction: CreationTransactionType) => Promise<void>;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data.transactions));
    }, [])

    async function createTransaction(transactionInput: CreationTransactionType) {
        await api.post('/transactions', transactionInput);

        // Atualiza as transactions com as transactions do banco de dados
        await api.get('/transactions')
            .then(res => setTransactions(res.data.transactions))
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    
    return context;
}
