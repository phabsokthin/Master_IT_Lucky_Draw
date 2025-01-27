<template>
    <div class="flex items-center justify-center ">
        <div class="text-center bg-white  flex items-center gap-1">
            <img src="@/assets/icons8-time.gif" class="w-7" alt="">
            <div>
                <p class="text-sm font-koulen text-gray-600" v-if="khmerDate">{{ khmerDate }}</p>
                <p class="text-red-500" v-else>កំពុងផ្ទុក...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            khmerDate: null,
        };
    },
    methods: {
        // Convert numbers to Khmer numerals
        toKhmerNumber(num) {
            const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
            return num
                .toString()
                .split('')
                .map((digit) => khmerNumbers[parseInt(digit)])
                .join('');
        },
        // Format the number to ensure two digits, add leading zero if necessary
        formatToTwoDigits(num) {
            return num < 10 ? '0' + num : num;
        },
        // Format date and time with Khmer months and numerals
        formatKhmerDateTime(date) {
            const khmerMonths = [
                "មករា",
                "កុម្ភៈ",
                "មិនា",
                "មេសា",
                "ឧសភា",
                "មិថុនា",
                "កក្កដា",
                "សីហា",
                "កញ្ញា",
                "តុលា",
                "វិច្ឆិកា",
                "ធ្នូ",
            ];
            const day = this.toKhmerNumber(this.formatToTwoDigits(date.getDate()));
            const month = khmerMonths[date.getMonth()];
            const year = this.toKhmerNumber(date.getFullYear());
            const hours = this.toKhmerNumber(this.formatToTwoDigits(date.getHours()));
            const minutes = this.toKhmerNumber(this.formatToTwoDigits(date.getMinutes()));
            const seconds = this.toKhmerNumber(this.formatToTwoDigits(date.getSeconds()));
            return `ថ្ងៃ${day} ខែ${month} ឆ្នាំ${year} ម៉ោង${hours}:${minutes}:${seconds}`;
        },
        // Update date and time every second
        updateDateTime() {
            const currentDate = new Date();
            this.khmerDate = this.formatKhmerDateTime(currentDate);
        },
    },
    mounted() {
        // Initialize and update date and time every second
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
    },
};
</script>


<style scoped>
/* Add custom styles if needed */
</style>