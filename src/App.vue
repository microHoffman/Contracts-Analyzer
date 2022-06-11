<template>
  <input class="input" v-model="address" @keyup.enter="analyzeContract" />
  <button class="button" @click="analyzeContract">Analyze contract</button>
  <div>{{ contractInfo }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { analyzeContract as analyzeContractFunction } from "./analysis/basicInfo";

const address = ref("")

const contractInfo = ref("")

const analyzeContract = async (): Promise<void> => {
  contractInfo.value = await analyzeContractFunction(address.value)
}
</script>


<style>

</style>
