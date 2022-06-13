<template>
  <div class="wrapper">
    <h1>Contract Analyzer</h1>
    <div class="input-wrapper">
      <input class="input" v-model="address" @keyup.enter="analyzeContract" />
      <button class="button" @click="analyzeContract">Analyze contract</button>
    </div>
    <div class="result-item contract-deploy-time">
      contract deploy time:
      <div v-if="isLoadingContractDeployTime" class="loader"></div>
      <template v-else-if="contractDeployTime">{{ contractDeployTime }}</template>
    </div>
    <div class="result-item">
      amount of transactions:
      <div v-if="isLoadingNativeTransactions" class="loader"></div>
      <template v-else-if="nativeTransactions?.total || nativeTransactions?.total === 0">{{ nativeTransactions.total }}</template>
    </div>
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
.wrapper {
  display: grid;
  place-items: center;
}

h1 {
  font-size: 3rem;
}

.input-wrapper {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.input {
  width: 25rem;
}

.loader {
  display: inline-block;
  width: 35px;
  height: 35px;
}

.loader:after {
  content: " ";
  display: block;
  width: 30px;
  height: 30px;
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

.result-item {
  font-size: 2rem;
}
</style>
