import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

export default function Wallet() {

    const [loading, setLoading] = useState<boolean>(false)
    const [account, setAccount] = useState<null | string>(null);

    const checkedWalletIsConnected = async() => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                console.log("metamask is available!");
            } else {
                console.log("please install metamask");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 连接metamask钱包
    const connectWallet = async() => {
        try {
            const ethereum = window.ethereum;
            if(!window.ethereum) {
                alert("please install metamask")
                return;
            }
            setLoading(true);
            const account = await ethereum.request({
                method: "eth_requestAccounts"
            })
            setAccount(account[0]);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkedWalletIsConnected()
    }, [])

  return (
    <Button
        loading={loading}
        onClick={connectWallet}
        style={{background: 'orange', color: '#fff'}}
        size="large" shape="round" type="text">
        {account ? `${account.substring(0, 6)}...${account.substring(account.length - 6, account.length)}` : 'CONNECT WALLET'}
    </Button>
  )
}