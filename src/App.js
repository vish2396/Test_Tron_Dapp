import React, { useEffect, useState } from 'react';
import HelloWorldContract from './build/contracts/HelloWorld.json';

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const connectTronLink = async () => {
      if (typeof window.tronWeb !== 'undefined') {
        try {
          await window.tronWeb.ready;
          const accounts = await window.tronWeb.trx.getAccount();
          if (accounts && accounts.address) {
            const addressBase58 = window.tronWeb.address.fromHex(accounts.address);
            setAccount(addressBase58);
            const helloAddress = 'TKMN4zPEkMvg4nHQaiNacg9W2WzNpfJ6Zf';
            console.log("Contract ABI:", HelloWorldContract);
            const helloContract = await window.tronWeb.contract().at(helloAddress);
            setContract(helloContract);
          } else {
            console.error('Error retrieving account information:', accounts);
            // Handle error or show error message to the user
          }
        } catch (error) {
          console.error('Error connecting to TronLink:', error);
          // Handle error or show error message to the user
        }
      } else {
        console.error('TronLink is not installed');
        // Handle alternative wallet connection method or show error message to the user
      }
    };

    connectTronLink();

    const init = async () => {
      if (typeof window.tronWeb !== 'undefined' && window.tronWeb.ready) {
        const tronWebInstance = window.tronWeb;

        try {
          if (tronWebInstance.hasOwnProperty('tronLink')) {
            const accounts = await tronWebInstance.tronLink.request({ method: 'tron_requestAccounts' });
            if (accounts && accounts.length > 0) {
              setAccount(accounts[0]);
            } else {
              console.error('No accounts found');
              // Handle error or show error message to the user
            }
          } else {
            console.error('TronLink extension is not available');
            // Handle alternative wallet connection method or show error message to the user
          }

          const currentBlock = await tronWebInstance.trx.getCurrentBlock();
          const networkId = currentBlock.block_header.raw_data.number;
          const deployedNetwork = HelloWorldContract.networks[networkId];

          if (deployedNetwork && deployedNetwork.address) {
            const contractInstance = tronWebInstance.contract().at(deployedNetwork.address);
            setContract(contractInstance);
            console.log('Contract Address:', deployedNetwork.address);
          } else {
            console.error('Contract address not found');
            // Handle error or show error message to the user
          }
        } catch (error) {
          console.error('Error requesting account information:', error);
          // Handle error or show error message to the user
        }
      } else {
        console.error('TronWeb is not available or not ready');
      }
    };

    init();
  }, []);

  const handleGetMessage = async () => {
    try {
      if (contract) {
        const message = await contract.methods.getMessage().call();
        setMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostMessage = async () => {
    try {
      if (contract) {
        await contract.methods.postMessage(newMessage).send({ from: account });
        setNewMessage('');
        await handleGetMessage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hello World Smart Contract</h1>
      <p>Connected Tron Wallet Address: {account}</p>

      <div>
        <button onClick={handleGetMessage}>Get Message</button>
        <p>Current Message: {message}</p>

        <div>
          <input
            type="text"
            placeholder="Enter new message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handlePostMessage}>Post Message</button>
        </div>
      </div>
    </div>
  );
};

export default App;
