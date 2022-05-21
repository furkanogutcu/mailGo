<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div>
        <div class="row">
            <div class="col-10">
                <PageTitle :title="'Toplu abone ekleme'" :subtitle="'Toplu şekilde yeni aboneler ekleyin'">
                </PageTitle>
            </div>
        </div>

        <div class="subscriber-add-box">
            <progress v-if="uploadPercentage > 0" max="100" :value.prop="uploadPercentage"></progress><br>
            <input type="file"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                aria-label="File upload button for bulk subscriber upload" @change="handleFileUpload($event)" />
            <br>
            <br>
            <p>
                Yalnızca <strong>.csv</strong> , <strong>.xls</strong> ve <strong>.xlsx</strong> dosyaları
                yükleyebilirsiniz
            </p>
            <p>
                <strong>Veri formatı:</strong> firstName, lastName, email, password
                <br>('password' değeri girilmezse otomatik atanır)
            </p>
            <hr width="100%">
            <button class="btn btn-primary" @click="submitFile()">Yükle</button>
            <hr width="100%">
            <p>
                <strong>NOT:</strong>
                Yeni abonelerin sisteme giriş bilgileri otomatik olarak kendilerine e-mail gönderilecektir.
            </p>
        </div>
    </div>
</template>

<script>
import PageTitle from '~/components/pageTitle.vue';
export default {
    components: { PageTitle },
    middleware: ['adminCheck'],
    data() {
        return {
            file: '',
            uploadPercentage: 0
        };
    },
    mounted() {
        // FIXME - Ekran ortalamasını düzeltmek için
        document.body.style.display = 'block';
        document.body.style['justify-content'] = 'default';
        document.body.style['align-items'] = 'default';
        document.body.style.height = '100vh';
        document.body.style['overflow-x'] = 'hidden';
        document.body.style['overflow-y'] = 'hidden';
    },
    methods: {
        // https://github.com/serversideup/uploading-files-vuejs-axios/blob/main/src/components/FileProgress.vue
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async submitFile() {
            if (this.file === '') {
                this.$toasted.error('Lütfen bir dosya seçin');
                return;
            }
            const formData = new FormData();
            formData.append('file', this.file);
            if (
                formData.get('file').type !== 'text/csv' &&
                formData.get('file').type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                formData.get('file').type !== 'application/vnd.ms-excel'
            ) {
                this.$toasted.error('Yalnızca .csv, .xls veya .xlsx dosyaları yükleyebilirsiniz');
                return;
            }
            try {
                const response = await this.$axios.post('subscriber/bulk-add',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (progressEvent) {
                            this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                        }.bind(this)
                    }
                ).catch((error) => {
                    this.$toasted.error(error.response.data.message);
                });
                if (response.data.success) {
                    this.$toast.success(response.data.message);
                    this.$router.push('/admin/subscriber-management');
                } else {
                    this.$toast.error(response.data.message);
                }
            } catch {
                this.$toasted.error('Dosya yüklenirken bir hata oluştu');
            }
        },
    },
};
</script>

<style scoped>
.subscriber-add-box {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
}
</style>
