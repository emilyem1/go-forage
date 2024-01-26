const LoginSignup = (props) => {
  return (
    <main>
      {/* Login Form */}
      <form action="" method="POST" id="login-form" class="">
        <input
          type="email"
          class="input-field"
          placeholder="E-mail Address"
          name="email"
          required
        />
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
      </form>

      {/* Signup Form */}
      <form action="" method="POST" id="signup-form" class="">
        <input
          type="email"
          class="input-field"
          placeholder="E-mail Address"
          name="email"
          required
        />
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
      </form>
    </main>
  );
};

export default LoginSignup;
