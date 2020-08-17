<template>
    <div class="flashcard">
        <p>{{ question }}</p>
        <button
            v-on:click="showAnswer = !showAnswer">
            Show/Hide Answer
        </button>
        <p
            v-show="showAnswer">
            {{ answer }}
        </p>
        <button
            v-on:click="removeItem"
            class="delete-button">
            DELETE
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Flashcard extends Vue {
    public static uuid = 1;

    @Prop({required: true})
    public uid!: number;

    @Prop({required: true})
    public question!: string;

    @Prop({required: true})
    public answer!: string;

    private showAnswer = false;

    public removeItem(): void {
        this.$emit('removeItem', this.uid);
        this.$destroy();
    }
}
</script>

<style scoped>
.flashcard {
    border: 2px solid black;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}

.delete-button {
    margin-top: 8px;
}
</style>
