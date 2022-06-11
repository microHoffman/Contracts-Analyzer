<template>
  <input class="input" v-model="address" @keyup.enter="analyzeContract" />
  <button class="button" @click="analyzeContract">Analyze contract</button>
  <div v-if="contractDeployTime">
    contract deploy time: {{ contractDeployTime }}
  </div>
  <div v-if="nativeTransactions">
    amount of transactions: {{ nativeTransactions.total }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getContractNativeTransactions, getContractDeployTime } from "./analysis/basicInfo";

const address = ref("")

const nativeTransactions = ref()
const contractDeployTime = ref()

const analyzeContract = async (): Promise<void> => {
  getContractDeployTime(address.value).then(deployTime => (contractDeployTime.value = deployTime))
  getContractNativeTransactions(address.value).then(contractNativeTransactions => (nativeTransactions.value = contractNativeTransactions))
}
</script>


<style>

</style>
