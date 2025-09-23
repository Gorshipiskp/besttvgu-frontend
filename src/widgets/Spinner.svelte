<script lang="ts">
    export let sizeCoef: number = 1
</script>

<style>
    .loader {
        border: 5px solid #dcdcdc;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<span style="width: {50 * sizeCoef}px; height: {50 * sizeCoef}px; border-width: {5 * sizeCoef}px" class="loader"></span>