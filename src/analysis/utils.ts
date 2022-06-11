import nodeProvider from "../web3/nodeProvider";

export const getBlockDateTime = async (blockNumber: number): Promise<string> => {
    const blockDetails = await nodeProvider.getBlock(blockNumber)
    const timestampInMilliseconds = blockDetails.timestamp * 1000
    return new Date(timestampInMilliseconds).toISOString()
}