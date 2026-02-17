import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await getTransactions();
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h2>Transaction History</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.product?.name}</td>
              <td>{t.type}</td>
              <td>{t.quantity}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
