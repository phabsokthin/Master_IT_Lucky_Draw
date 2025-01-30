<template>
    <div class="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="w-auto h-10 mx-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow">
            <h2 class="mt-6 text-3xl font-extrabold leading-9 text-center text-red-500 font-koulen ">
                ចូលប្រើប្រាស់កម្មវិធីរង្វាន់ផ្សងសំណាង
            </h2>
            <p class="mt-2 text-sm leading-5 text-center text-blue-500 max-w font-koulen">
                រឺ
                <RouterLink :to="{name: 'signup'}"
                    class="font-medium text-blue-500 underline transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline">
                    បង្កើតគណនីថ្មី
                </RouterLink>
            </p>
        </div>


        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleSignIn">
                    <div>
                        <label for="email"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">អុីម៉ែល</label>
                        <div class="relative mt-1 rounded-md shadow-sm">
                            <input id="email" name="email" v-model="email" required placeholder="***@gmail.com" type="email" value=""
                                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">

                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <label for="password"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">ពាក្យសម្ងាត់</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" placeholder="********" v-model="password" required name="password" type="password"
                                class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="flex items-center justify-end mt-6">
                        <!-- <div class="flex items-center">
                        <input id="remember_me" name="remember" type="checkbox" value="1" class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox">
                        <label for="remember_me" class="block ml-2 text-sm leading-5 text-gray-900">Remember me</label>
                    </div> -->

                        <div class="text-sm leading-5">
                            <a href="#"
                                class="font-medium text-blue-500 transition duration-150 ease-in-out font-koulen hover:text-blue-500 focus:outline-none focus:underline">
                                ភ្លេចពាក្យសម្ងាត់?
                            </a>
                        </div>
                    </div>

                    <div class="mt-6">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit"
                                class="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md font-koulen hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevrons-right">
                                    <path d="m6 17 5-5-5-5" />
                                    <path d="m13 17 5-5-5-5" />
                                </svg>
                                <span v-if="!isLoading">ចូលប្រើប្រាស់</span>
                                <span v-else>កំពុងចូលប្រើប្រាស់...</span>
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
import useSignin from '@/firebase/useLogin';
import { handleMessageError } from '@/message';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref("")
        const password = ref("")
        const isLoading = ref(false)
        const router = useRouter();

        const { signIn } = useSignin()

        const handleSignIn = async () => {
            isLoading.value = true
            try {
                const res = await signIn(email.value, password.value)
                if (res) {
                    router.push({name: 'reward'})
                }
                else {
                    handleMessageError("សូមពិនិត្យមើលអ៊ីម៉ែលនិងពាក្យសម្ងាត់ម្តង់ទៀត! មិនត្រឹមត្រូវ")
                }
            }
            catch (err) {
                console.log(err)
                
            }
            finally{
                isLoading.value = false
            }

        }

        return { email, password, handleSignIn, isLoading }
    }
}

</script>