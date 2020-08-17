<template>
    <div class="wrapper">
        <h1>Flashcards</h1>
        <button
            v-on:click="showForm = true"
            class="add-question">
            Add Question
        </button>
        <flashcard-form
            v-show="showForm"
            v-on:addItem="addFlashcard"
            v-on:hideForm="showForm = false"
        />
        <div class="flashcard-masonry">
            <flashcard
                v-for="flashcard in flashcardList"
                :key="flashcard.uid"
                :uid="flashcard.uid"
                :question="flashcard.question"
                :answer="flashcard.answer"
                v-on:removeItem="removeFlashcard"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import FlashcardForm from "@/components/project16/FlashcardForm.vue";
import Flashcard from '@/components/project16/Flashcard.vue';

@Component({
    components: {
        FlashcardForm,
        Flashcard
    }
})
export default class Project16 extends Vue {
    private showForm = false;
    public flashcardList: Flashcard[] = []

    public addFlashcard(question: string, answer: string): void {
        this.flashcardList.push(new Flashcard({
            propsData: {
                uid: Flashcard.uuid++,
                question: question,
                answer: answer
            }
        }));
    }

    public removeFlashcard(id: number): void {
        this.flashcardList = this.flashcardList.filter((flashcard: Flashcard) => flashcard.uid !== id);
    }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, serif;
}

button {
    margin-bottom: 20px;
}

.flashcard-masonry {
    display: flex;
    flex-wrap: wrap;
}
</style>
