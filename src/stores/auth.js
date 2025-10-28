import { defineStore } from 'pinia';
import router from '@/router';
// ⚠️ استيراد بيانات المحاكاة بدلاً من apiClient
import mockAuthSuccess from '@/mock/authSuccess.json';
import mockAuthConflict from '@/mock/authConflict.json';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('access_token') || null, 
        user: null, 
        authLoading: false, 
        authError: null,
    }),
    
    getters: {
        isLoggedIn: (state) => !!state.accessToken,
    },
    
    actions: {
        // دالة مساعدة لتقليد تأخير الشبكة (لا تُستخدم في الكود الحقيقي)
        async delay() {
            return new Promise(resolve => setTimeout(resolve, 800)); // تأخير 800 مللي ثانية
        },

        // 1. محاكاة التسجيل (POST /auth/register)
        async register(userData) {
            this.authLoading = true;
            this.authError = null;
            await this.delay(); // 🚨 محاكاة زمن الاستجابة

            // 🚨 منطق المحاكاة: نفترض أن التسجيل يفشل إذا كان البريد هو 'conflict@projy.com'
            if (userData.email === 'conflict@projy.com') {
                this.authError = mockAuthConflict.message;
                this.authLoading = false;
                // يجب أن نرمي خطأ ليتمكن المكون من التعامل معه
                throw new Error(this.authError);
            }
            
            // 🚨 محاكاة النجاح: نستخدم بيانات الاستجابة الناجحة
            this.accessToken = mockAuthSuccess.access_token;
            this.user = mockAuthSuccess.user;
            localStorage.setItem('access_token', this.accessToken);
            
            this.authLoading = false;
            router.push('/login'); 
        },

        // 2. محاكاة تسجيل الدخول (POST /auth/login)
        async login(credentials) {
            this.authLoading = true;
            this.authError = null;
            await this.delay(); // 🚨 محاكاة زمن الاستجابة
            
            // 🚨 منطق المحاكاة: نفترض أن الدخول ينجح فقط بالبيانات الموحدة
            if (credentials.email !== 'mock.user@projy.com' || credentials.password !== 'SecurePassword123') {
                this.authError = 'Invalid email or password (Mock Error)';
                this.authLoading = false;
                throw new Error(this.authError);
            }
            
            // 🚨 محاكاة النجاح
            this.accessToken = mockAuthSuccess.access_token;
            this.user = mockAuthSuccess.user;
            localStorage.setItem('access_token', this.accessToken);

            this.authLoading = false;
            router.push('/pages/projects'); 
        },

        // 3. الإجراءات الأخرى (تظل كما هي)
        logout() {
            this.accessToken = null;
            this.user = null;
            localStorage.removeItem('access_token');
            router.push('/login');
        }
    }
});