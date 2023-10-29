export default function CreateAccount() {
  return (
    <>
      <h1>Create New Account</h1>
      <form>
        <label>
          Enter Username
          <input type="text" />
        </label>
        <label>
          Enter Password
          <input type="text" />
        </label>
        <label>
          Confirm Password
          <input type="text" />
        </label>
        <button type="submit">Create new user</button>
      </form>
    </>
  );
}
