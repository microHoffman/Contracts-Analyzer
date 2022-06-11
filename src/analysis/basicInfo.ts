import {MORALIS_WEB3_API_URL} from "../constants";

export const analyzeContract = async (contractAddress: string): Promise<string> => {
    await getContractDeployTime(contractAddress)
    return "ahoj"
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
