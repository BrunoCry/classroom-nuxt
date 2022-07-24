export default ({ store, redirect }) => {
    if (store.getters['auth/checkAuth']) {
      return redirect('/')
    }
}