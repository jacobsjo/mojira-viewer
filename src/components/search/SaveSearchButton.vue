<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Remove from '../icons/Remove.vue';
import { useSaveStore } from '../../stores/SaveStore';
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    jql: String
})

const dialog = useTemplateRef<HTMLDialogElement>('save-search')
const saveStore = useSaveStore()

const saved = computed(() => saveStore.savedSearches.find(s => s.jql === props.jql))

const name = ref('')

function openModal(){
    name.value = saved.value?.name ?? ""
    try{
        dialog.value?.showModal()
    } catch {}
}

function save(){
    if (saved.value) {
        saved.value.name = name.value
    } else {
        saveStore.savedSearches.push({jql: props.jql!, name: name.value})
    }
    dialog.value?.close()
}

function remove(){
    saveStore.savedSearches.splice(saveStore.savedSearches.findIndex(s => s.jql === props.jql), 1)
    dialog.value?.close()
}

</script>

<template>
    <font-awesome-icon :icon="[saved ? 'fas' : 'far', 'star']" tabindex="0" @click.stop.prevent="openModal" @keypress.enter.stop.prevent="openModal"/>
    <dialog tabindex="-1" ref="save-search" @click.stop.prevent="dialog?.close()" @keypress.enter.stop.prevent="dialog?.close()" @dragstart.stop.prevent="">
        <Remove class="close" tabindex="0" />
        <div class="dialog" @click.stop.prevent="">
            <h1>{{saved ? 'Update saved search' : 'Save search'}}</h1>
            <input class="search-input" v-model="name" placeholder="Enter name" />
            <button class="button" @click="save">
                <font-awesome-icon :icon="saved ? ['fas', 'pen'] : ['far', 'star']" />
                {{saved ? 'Rename' : 'Save'}}
            </button>
            <button v-if="saved" class="button" @click="remove">
                <font-awesome-icon :icon="['fas', 'trash']" />
                Delete
            </button>
        </div>
    </dialog>
</template>

<style scoped>

dialog {
    position: relative;
    padding: 0;
    border: 0;
    box-shadow: 1.5px 1.5px 5px 2px var(--box-shadow-color);
}

.dialog {
    padding: 2rem;
    background-color: var(--searchbar-bg-color);
    border: 1px solid var(--main-border-color);
    padding: 1.5rem;
}

.close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
    fill: var(--text-color);
}

h1 {
    margin: 0;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

button {
    margin-left: 0.5rem;
    height: 1.7rem;
    padding: 0 0.5rem;
}
</style>
