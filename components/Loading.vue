<style lang="scss">
    @import "../assets/sass/mixin";

    .loading {
        position: relative;
        display: flex;
        justify-content: center;
        height: 100px;

        .spinner {
            position: absolute;
            top: 45%;
            left: 50%;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background: $c_green_dark;
            @include animation(pulse 1s ease-in-out infinite);
            @include transform(translate(-50%, -50%) scale(0));
        }
    }

    // ANIMATIONS
    @keyframes pulse {
        0% {
            opacity: 1;
            @include transform(translate(-50%, -50%) scale(0));
        }
        100% {
            opacity: 0;
            @include transform(translate(-50%, -50%) scale(1.0));
        }
    }
</style>


<template>
    <div class="loading">
        <div class="spinner"></div>
    </div>
</template>


<script>
    export default {
        name: 'Loading',
    }
</script>