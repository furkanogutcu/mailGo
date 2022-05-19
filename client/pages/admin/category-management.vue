<template>
    <PageTitle :title="'Kategori yönetim'" :subtitle="'Sistemdeki kategorileri yönetin'">
    </PageTitle>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
};
</script>
