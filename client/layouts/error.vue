<template>
    <div>
        <h1 v-if="error.statusCode === 404">404 - Sayfa bulunamadı</h1>
        <h1 v-else>Bir hata oluştu - {{ error.statusCode }} </h1>
        <NuxtLink to="/dashboard">Panele geri dön</NuxtLink>
    </div>
</template>

<script>
export default {
    layout: 'error',
    props: ['error']
};
</script>
