import {MORALIS_CHAIN_ID, MORALIS_WEB3_API_URL} from "../constants";
import nodeProvider from "../web3/nodeProvider";

export const analyzeContract = async (contractAddress: string): Promise<any> => {
    const nativeTransactions = await getContractNativeTransactions(contractAddress)
    return { nativeTransactions }
}

export const getContractNativeTransactions = async (contractAddress: string): Promise<any> => {
    const contractLogs = await fetch(`${MORALIS_WEB3_API_URL}/${contractAddress}?chain=${MORALIS_CHAIN_ID}`, {
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': import.meta.env.VITE_MORALIS_KEY,
        }
    })
    const res = await contractLogs.json()
    console.log('ContractNativeTransaction', contractLogs)
    return res
}

export const getContractDeployBlockNumber = async (contractAddress: string): Promise<string> => {
    const latestBlock = await nodeProvider.getBlockNumber()

    let startBlock = 0
    let endBlock = latestBlock

    let latestBlockWithCode = undefined

    const NO_CODE = "0x"
    while (startBlock <= endBlock) {
        const searchBlockNumber = (startBlock + endBlock) >> 1
        const hasCodeAtSearchedBlock = await nodeProvider.getCode(contractAddress, searchBlockNumber)
        if (hasCodeAtSearchedBlock === NO_CODE) {
            startBlock = searchBlockNumber + 1
            continue
        }

        // contract code was found at current searchBlockNumber
        latestBlockWithCode = searchBlockNumber
        endBlock = searchBlockNumber - 1
    }

    if (latestBlockWithCode === undefined) {
        return `Contract with address: ${contractAddress} was not deployed (no code found).`
    }
    return String(latestBlockWithCode)
}