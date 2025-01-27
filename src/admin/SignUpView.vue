<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-koulen text-red-500 leading-9 font-extrabold ">
                បង្កើតអ្នកប្រើកម្មវិធីរង្វាន់ផ្សងសំណាង
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w font-koulen">
                រឺ
                <RouterLink  :to="{name: 'login'}"
                    class="font-medium underline text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    ចូលប្រើប្រាស់
                </RouterLink>
            </p>
        </div>


        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="">

                    <div>
                        <label for="email"
                            class="block text-sm font-medium leading-5  text-gray-700 font-koulen">អ្នកប្រើប្រាស់</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" name="email" required placeholder="អ្នកប្រើប្រាស់" type="text" value=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                            <div class=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">

                            </div>
                        </div>
                    </div>
                    <div class="mt-2">
                        <label for="email"
                            class="block text-sm font-medium leading-5  text-gray-700 font-koulen">អុីម៉ែល</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" name="email" required placeholder="***@gmail.com" type="email" value=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                            <div class=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">

                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <label for="password"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">ពាក្យសម្ងាត់</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" placeholder="********" required name="password" type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>
                    <div class="mt-2">
                        <label for="password"
                            class="block text-sm font-medium leading-5 text-gray-700 font-koulen">បញ្ជាក់ពាក្យសម្ងាត់</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" placeholder="********" required name="password" type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                        </div>
                    </div>

                    <div class="mt-2 flex items-center justify-end">
             
                        <div class="text-sm leading-5">
                            <a href="#"
                                class="font-koulen font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                ភ្លេចពាក្យសម្ងាត់?
                            </a>
                        </div>
                    </div>

                    <div class="mt-2">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit"
                                class="w-full flex justify-center font-koulen py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevrons-right">
                                    <path d="m6 17 5-5-5-5" />
                                    <path d="m13 17 5-5-5-5" />
                                </svg>
                                <span>បង្កើតអ្នកប្រើប្រាស់</span>
                            </button>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>