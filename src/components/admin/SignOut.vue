<template>

    <!-- Bottom-Right Corner -->
    <div class="fixed bottom-4 right-4">
        <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-log-out">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
        </button>
    </div>
</template>


<script>
import useSignout from '@/firebase/useSignout';
import { useRouter } from 'vue-router';

export default{
    setup(){
        const { signOut } = useSignout();
        const router = useRouter();

        const handleLogout = async() => {
            if(window.confirm("តើអ្នកចង់ចាកចេញមែនទេ?")){
                await signOut()
                router.push({ name: 'login' });
            }
        }


        return {handleLogout}
    }
}


</script>