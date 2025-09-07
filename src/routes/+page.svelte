<script type="text/javascript">
    // Only run this code in the browser
    if (typeof window !== 'undefined') {
        let newScript = document.createElement('script');
        newScript.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?22');
        newScript.setAttribute('data-telegram-login', 'best_debug_bot');
        newScript.setAttribute('data-size', 'large');
        newScript.setAttribute('data-onauth', 'onTelegramAuth(user)');
        newScript.setAttribute('data-request-access', 'write');
        document.head.appendChild(newScript);
    }

    function onTelegramAuth(user) {
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }
</script>

<main>
    <div id="telegram-widget"></div>
</main>