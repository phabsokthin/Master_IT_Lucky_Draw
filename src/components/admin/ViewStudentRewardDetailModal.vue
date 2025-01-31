<template>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-top sm:h-screen"></span>
      <div
        class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-[45%]">


        <div class="">


          <div>
            <div>
              <div class="overflow-hidden bg-white ">
                <!-- Header Section -->
                <div class="p-6 rounded-t-lg bg-gradient-to-r from-red-500 to-red-400 ">
                  <div class="my-4">
                    <div class="text-lg font-medium leading-6 text-white font-koulen">សិស្សឈ្មះរង្វាន់</div>
                  </div>
                </div>

                <!-- Profile Details Section -->
                <div class="">
                  <!-- Profile Image and Name -->
                  <div class="relative flex justify-center mt-2">
                    <div class="space-y-2">

                      <div class="flex items-center justify-center rounded-full h-28 w-28 bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="lucide lucide-user">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div class="text-center">
                        <span class="text-[50px] font-koulen">{{ studentDoc.studentName }}</span>
                      </div>
                    </div>
                  </div>



                  <!-- Divider -->
                  <div class="my-4 border-t border-gray-200"></div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <!-- Email -->
                    <div>
                      <p class="text-sm text-gray-500">Email</p>
                      <p class="font-medium text-gray-800">john.doe@example.com</p>
                    </div>
                    <!-- Phone -->
                    <div>
                      <p class="text-sm text-gray-500">Phone</p>
                      <p class="font-medium text-gray-800">+1 (123) 456-7890</p>
                    </div>
                    <!-- Location -->
                    <div>
                      <p class="text-sm text-gray-500">Location</p>
                      <p class="font-medium text-gray-800">New York, USA</p>
                    </div>
                    <!-- Joined Date -->
                    <div>
                      <p class="text-sm text-gray-500">Joined</p>
                      <p class="font-medium text-gray-800">January 2022</p>
                    </div>
                  </div>

                  <!-- Divider -->
                  <div class="my-4 border-t border-gray-200"></div>

                  <!-- Bio Section -->

                </div>

                <!-- Footer Section -->

              </div>
            </div>

          </div>

          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span v-if="!btnEdit" class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button v-if="!isLoading" type="submit"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                រក្សាទុក
              </button>
              <button v-else
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                កំពុងរក្សាទុក...
              </button>
            </span>

            <span class="flex w-full mt-3 space-x-2 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button" @click="handleClose"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm font-koulen hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                បោះបង់
              </button>

            </span>
          </div>
        </div>
      </div>


      <!-- component -->

    </div>
  </div>

</template>


<script>

export default {
  props: ['rewardTypesId', 'itemQty', "rewardDoc", "studentDoc"],

  setup(props, { emit }) {

    const handleClose = () => {
      emit('close');
    }
    return {
      handleClose
    }
  }

};
</script>