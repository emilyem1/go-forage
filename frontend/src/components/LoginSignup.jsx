import "../styles/LoginSignup.scss";

const LoginSignup = (props) => {
  return (
    <main>
      <div class="formContainer">
        {/* Login Form */}
        <form action="" method="POST" id="login-form" class="form">
          <h2>Login</h2>
          <label for="email">E-mail Address:</label>
          <input
            type="email"
            class="input-field"
            placeholder="E-mail Address"
            name="email"
            required
          />
          <label for="email">Password:</label>
          <input
            type="password"
            class="input-field"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit" class="submit-btn">
            Login
          </button>
          <p>
            Don't have an account? <a>Sign Up</a>
          </p>
        </form>

        {/* Signup Form */}
        <form action="" method="POST" id="signup-form" class="form">
          <h2>Sign Up</h2>
          <label for="email">E-mail Address:</label>
          <input
            type="email"
            class="input-field"
            placeholder="E-mail Address"
            name="email"
            required
          />
          <label for="email">Password:</label>
          <input
            type="password"
            class="input-field"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit" class="submit-btn">
            Sign Up
          </button>
          <p>
            Already have an account? <a>Log In</a>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginSignup;
