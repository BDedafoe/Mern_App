import '../App.css'

const Home = () => {
    return (
        <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card border-primary mb-2 text-center">
        <div class="card-body">
        <h1><i class="fa-regular fa-id-card fa-2x"></i></h1>
        <h2>MERN App</h2>
        <p>Login or create an account</p>
        <a href="/users/login" class="btn btn-outline-info btn-block">Login</a>
        <a href="/users/register" class="btn btn-outline-info btn-block">Register</a>
      </div>
    </div>
    </div>
</div>
    )
}

export default Home