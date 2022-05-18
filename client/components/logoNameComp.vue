<!-- eslint-disable vue/html-closing-bracket-newline */-->
<!-- eslint-disable vue/first-attribute-linebreak */-->
<!-- eslint-disable vue/max-attributes-per-line */-->
<template>
    <div class="logo">
        <svg class="mr-3" version="1.0" xmlns="http://www.w3.org/2000/svg" :width="70 * size" :height="70 * size"
            viewBox="0 0 344 344" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,344) scale(0.1,-0.1)" :fill="'#' + color" stroke="none">
                <path d="M278 2891 c-72 -23 -113 -49 -164 -103 -55 -57 -80 -102 -99 -173-13 -51 -15 -175 -15 -895 0 -908 -1 -899 56 -996 37 -63 125 -139 192 -166
                            l57 -23 1415 0 1415 0 57 23 c67 27 155 103 192 166 57 97 56 88 56 996 0 908
                            1 899 -56 996 -37 63 -125 139 -192 166 l-57 23 -1400 2 c-1329 2 -1403 1
                            -1457 -16z m730 -844 l712 -385 723 390 c897 484 876 473 851 451 -11 -10
                            -237 -187 -502 -392 l-481 -375 322 -328 c372 -379 517 -534 467 -497 -152
                            111 -969 689 -974 689 -4 0 -95 -56 -202 -125 -107 -69 -198 -125 -204 -125
                            -5 0 -94 55 -197 121 -104 67 -193 124 -200 126 -9 3 -756 -519 -1003 -701
                            -31 -23 175 194 487 512 l322 329 -481 374 c-265 206 -491 382 -502 392 -26
                            23 -10 14 862 -456z" />
            </g>
        </svg>
        <div class="d-flex justify-content-center text-white">
            <span style="font-weight:400;"
                :style="{ 'color': '#' + color, 'font-size': 50 * size + 'px' }">mailGo</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['color', 'size'],
};
</script>

<style scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
