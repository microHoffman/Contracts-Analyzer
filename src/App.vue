<template>
  <input class="input" v-model="address" @keyup.enter="analyzeContract" />
  <button class="button" @click="analyzeContract">Analyze contract</button>
  <div class="contract-deploy-time">
    contract deploy time:
    <div v-if="isLoadingContractDeployTime" class="loader"></div>
    <template v-else-if="contractDeployTime">{{ contractDeployTime }}</template>
  </div>
  <div>
    amount of transactions:
    <div v-if="isLoadingNativeTransactions" class="loader"></div>
    <template v-else-if="nativeTransactions?.total || nativeTransactions?.total === 0">{{ nativeTransactions.total }}</template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getContractNativeTransactions, getContractDeployTime } from "./analysis/basicInfo";

const address = ref("")

const nativeTransactions = ref()
const contractDeployTime = ref()

const isLoadingContractDeployTime = ref(false)
const isLoadingNativeTransactions = ref(false)

const analyzeContract = async (): Promise<void> => {
  [isLoadingNativeTransactions.value, isLoadingContractDeployTime.value] = [true, true]
  getContractNativeTransactions(address.value).then(contractNativeTransactions => {
    nativeTransactions.value = contractNativeTransactions
    isLoadingNativeTransactions.value = false
  })
  getContractDeployTime(address.value).then(deployTime => {
    contractDeployTime.value = deployTime
    isLoadingContractDeployTime.value = false
  })
}
</script>


<style>
.loader {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.loader:after {
  content: " ";
  display: block;
  width: 16px;
  height: 16px;
  margin: 8px;
  border-radius: 50%;
  border: 4px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.contract-deploy-time {
  margin-bottom: 0.5rem;
}
</style>
