// signIn and signOut is server flow so can't be in client component
// we cant have any interactivity in server component

import { signInAction } from "../_lib/actions";

// to add interactivity in server component we can use serverAction
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
