let apiurl = 'https://project-management-barakah.vercel.app';
function getHeader() {
    let token = localStorage.getItem('token');
    let headers = {
        'Content-Type': 'application/json',
        
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}
export {
    apiurl,
    getHeader,
}