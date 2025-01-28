<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-koulen text-red-500 leading-9 font-extrabold ">
                បង្កើតអ្នកប្រើកម្មវិធីរង្វាន់ផ្សងសំណាង
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w font-koulen">
                រឺ
                <RouterLink :to="{ name: 'login' }"
                    class="font-medium underline text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    ចូលប្រើប្រាស់
                </RouterLink>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleSignUp">
                    <!-- Username Input -->
                    <div>
                        <label for="username"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">អ្នកប្រើប្រាស់</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="username" v-model="username" required placeholder="អ្នកប្រើប្រាស់" type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div class="mt-2">
                        <label for="email"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">អុីម៉ែល</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" v-model="email" required placeholder="***@gmail.com" type="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="mt-2">
                        <label for="password"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">ពាក្យសម្ងាត់</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" v-model="password" placeholder="********" required type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <!-- Confirm Password Input -->
                    <div class="mt-2">
                        <label for="confirmPassword"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">បញ្ជាក់ពាក្យសម្ងាត់</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="confirmPassword" v-model="confirmPassword" placeholder="********" required
                                type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <!-- Forgot Password Link -->
                    <div class="mt-2 flex items-center justify-end">
                        <div class="text-sm leading-5">
                            <a href="#"
                                class="font-koulen font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                ភ្លេចពាក្យសម្ងាត់?
                            </a>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="mt-2">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" :disabled="isLoading"
                                class="w-full flex justify-center font-koulen py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out gap-1 items-center">
                                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right">
                                    <path d="m6 17 5-5-5-5" />
                                    <path d="m13 17 5-5-5-5" />
                                </svg>
                                <span v-if="isLoading">កំពុងបញ្ចូល...</span>
                                <span v-else>បង្កើតអ្នកប្រើប្រាស់</span>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/firebase/useSignUp';
import useCollection from '@/firebase/useCollection';
import { handleMessageError, handleMessageSuccess } from '../message';

export default {
    setup() {


        const username = ref("")
        const email = ref("")
        const password = ref("")
        const confirmPassword = ref("")
        const isLoading = ref(false)

        const { signup } = useSignup()
        const { setDocs } = useCollection("users")


        const handleSignUp = async () => {
            isLoading.value = true
            if (password.value !== confirmPassword.value) {
                handleMessageError("ពាក្យសម្ងាត់មិនអាចខុសគ្នាទេ! ពិនិត្យមើលម្តងទៀត")
                isLoading.value = false
            }
            else {
                isLoading.value = true
                const data = {
                    username: username.value,
                    email: email.value,
                    password: password.value
                }
                console.log(data)
                const res = await signup(email.value, password.value, `${username.value}`)
                // console.log(res)
                if (res?.user?.uid) {
                    
                    try {
                        const sign_success = await setDocs(data, res?.user?.uid);
                        if (sign_success) {
                            handleMessageSuccess(`បានបង្កើតអ្នកប្រើប្រាស់ឈ្មោះ ${username.value} ដោយជោគជ័យ!`)
                            clearData();
                        }
                    }
                    catch (err) {

                        console.log(err)

                    }
                    finally {
                        isLoading.value = false;
                    }
                }

            }

        };



        function clearData() {
            username.value = ""
            email.value = ""
            password.value = ''
            confirmPassword.value = ""
        }

        return {
            username,
            email,
            password,
            confirmPassword,
            handleSignUp,
            isLoading
        };
    },
};
</script>

<style scoped></style>