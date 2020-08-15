<template>
    <form
        action="#"
        v-on:submit.prevent="$emit('addItem', question, answer)">
        <button
            v-on:click="$emit('hideForm')"
            class="close-button"
            type="button">
            x
        </button>
        <label for="input-question"/>
        <input
            v-model="question"
            class="input-question"
            id="input-question"
            placeholder="Enter Your Question ..."
            required>
        <label for="input-answer"/>
        <input
            v-model="answer"
            class="input-answer"
            id="input-answer"
            placeholder="Enter You Answer ..."
            required>
        <button
            class="submit-button"
            type="submit">
            Add Item
        </button>
    </form>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class FlashcardForm extends Vue {
    private question = '';
    private answer = '';
}
</script>

<style scoped>
form {
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 8px;
}

.close-button {
    align-self: flex-end;
    flex: 0;
    margin-bottom: 20px;
}

form > input {
    flex: 1;
    margin-bottom: 20px;
}
</style>
