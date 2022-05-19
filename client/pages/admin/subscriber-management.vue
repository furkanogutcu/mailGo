<template>
    <PageTitle :title="'Abone yönetim'" :subtitle="'Sistemdeki aboneleri yönetin'">
    </PageTitle>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
};
</script>
