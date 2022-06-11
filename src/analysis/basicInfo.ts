import {MORALIS_WEB3_API_URL} from "../constants";

export const analyzeContract = async (contractAddress: string): Promise<any> => {
    await getContractDeployTime(contractAddress)
    const nativeTransactions = await getContractNativeTransactions(contractAddress)
    return { nativeTransactions }
}

export const getContractDeployTime = async (contractAddress: string): Promise<string> => {
    const { address, chain } = { address: contractAddress, chain: "eth" }
    const contractLogs = await fetch(`${MORALIS_WEB3_API_URL}/${address}/logs?chain=${chain}`, {
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': import.meta.env.VITE_MORALIS_KEY,
        }
    })
    console.log(contractLogs)
    console.log(await contractLogs.json())
}

export const getContractNativeTransactions = async (contractAddress: string): Promise<any> => {
    const { address, chain } = { address: contractAddress, chain: "eth" }
    const contractLogs = await fetch(`${MORALIS_WEB3_API_URL}/${address}?chain=${chain}`, {
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': import.meta.env.VITE_MORALIS_KEY,
        }
    })
    const res = await contractLogs.json()
    console.log('ContractNativeTransaction', contractLogs)
    return res
}