<template>
    <PageTitle :title="'Kampanya yönetim'" :subtitle="'Sistemdeki kampanyaları yönetin'">
    </PageTitle>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
};
</script>
