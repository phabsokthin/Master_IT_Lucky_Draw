<template>

    <div  class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div @click="handleClose" class="absolute inset-0 bg-gray-500 opacity-75 cursor-pointer"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
                class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle ">

                <div class="flex items-center justify-center bg-gray-100">
                    <div class="">
                        <div class="overflow-hidden bg-white ">
                            <div class="flex items-center justify-between px-6 py-3 bg-green-600">
                                <button @click="prevMonth" class="flex gap-1 text-white font-koulen"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-chevrons-left">
                                        <path d="m11 17-5-5 5-5" />
                                        <path d="m18 17-5-5 5-5" />
                                    </svg><span>មុន</span></button>
                                <h2 class="text-white font-koulen">{{ currentMonthName }} {{ toKhmerNumber(currentYear)
                                    }}</h2>
                                <button @click="nextMonth"
                                    class="flex gap-1 text-white font-koulen"><span>បន្ទាប់</span> <span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-chevrons-right">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg></span></button>
                            </div>
                            <div class="grid grid-cols-7 gap-2 p-4">
                                <div v-for="day in daysOfWeek" :key="day"
                                    class="font-semibold text-center text-green-600 font-koulen">
                                    {{ day }}
                                </div>
                                <div v-for="day in emptyDays" :key="'empty-' + day"></div>
                                <div v-for="day in daysInMonth" :key="day" @click="selectDate(day)" :class="{
                                    'text-center py-2 border cursor-pointer rounded-lg font-koulen text-gray-600': true,
                                    'bg-green-600 text-white': isCurrentDate(day)
                                }">
                                    {{ toKhmerNumber(day) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal -->
                    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
                        <div class="absolute inset-0 bg-black opacity-50"></div>
                        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg md:max-w-md">
                            <div class="px-6 py-4 text-left">
                                <div class="flex items-center justify-between pb-3">
                                    <p class="text-lg font-bold font-koulen">កាលបរិច្ឆេទដែលបានជ្រើសរើស</p>
                                    <button @click="closeModal"
                                        class="flex items-center justify-center px-2 py-2 text-xs text-white bg-red-400 rounded-full font-koulen hover:bg-red-500 focus:outline-none focus:ring"><span>បិទ</span></button>
                                </div>
                                <!-- Display the selected date in Khmer -->
                                <div class="font-semibold text-md font-koulen">
                                    {{ selectedDate }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <!-- <div class="flex justify-end">
                    <button @click="handleClose" class="px-4 py-1.5 rounded-full m-2 text-xs font-koulen hover:bg-red-400 text-white bg-red-500">បោះបង់</button>
                </div> -->


            </div>


            <!-- component -->

        </div>
    </div>

</template>


<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            showModal: false,
            selectedDate: '',
            daysOfWeek: ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'], // Khmer weekdays
            khmerMonths: [
                'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
                'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
            ], // Khmer month names
            khmerNumerals: ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'] // Khmer numerals
        };
    },
    computed: {
        currentMonthName() {
            return this.khmerMonths[this.currentMonth]; // Use Khmer month names
        },
        daysInMonth() {
            return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        },
        firstDayOfMonth() {
            return new Date(this.currentYear, this.currentMonth, 1).getDay();
        },
        emptyDays() {
            return Array(this.firstDayOfMonth).fill('');
        }
    },
    methods: {
        // Convert a number to Khmer numerals
        toKhmerNumber(number) {
            return number
                .toString()
                .split('')
                .map((digit) => this.khmerNumerals[digit])
                .join('');
        },
        prevMonth() {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
        },
        nextMonth() {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
        },
        isCurrentDate(day) {
            const today = new Date();
            return (
                this.currentYear === today.getFullYear() &&
                this.currentMonth === today.getMonth() &&
                day === today.getDate()
            );
        },
        selectDate(day) {
            const selectedDate = new Date(this.currentYear, this.currentMonth, day);
            // Convert the selected date to Khmer format
            this.selectedDate = this.formatKhmerDate(selectedDate);
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        // Format date to Khmer using Khmer numerals, weekdays, and months
        formatKhmerDate(date) {
            const dayOfWeek = this.daysOfWeek[date.getDay()];
            const day = this.toKhmerNumber(date.getDate());
            const month = this.khmerMonths[date.getMonth()];
            const year = this.toKhmerNumber(date.getFullYear());

            return `${dayOfWeek}, ${day} ${month} ${year}`;
        },

        handleClose() {
            this.$emit("close")
        }
    }
};
</script>
