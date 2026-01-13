import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Global state for current user
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);

export function useAuth() {
  const router = useRouter();

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      alert("User already exists!");
      return false;
    }

    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! Please login.");
    router.push('/login');
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      currentUser.value = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/profile');
    } else {
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  return { currentUser, register, login, logout };
}