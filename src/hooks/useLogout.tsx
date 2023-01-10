import Cookies from 'js-cookie';

export default function useLogout() {
    function logout() {
        Cookies.remove('token');
    }
    return { logout };
}