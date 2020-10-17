export function getAuthForm() {
    return `
         <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label for="password">Password</label>
            </div>
            <button type="submit"  id="login"
             class="mui-btn mui-btn--raised mui-btn--primary">
                Log in
            </button>
        </form>
    `
}


export function authWithEmailPassword(email, password) {
    const apiKey = 'AIzaSyDK4fbaJkmZj3SyCVMbGod1_up6p5fJ4Zg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => data.idToken)
}
