export default function({ $auth }) {
    $auth.onError((error, name, endpoint) => {
        console.log(`[ERROR] ${name} | ${error}`);
        $auth.logout();
    });
}
