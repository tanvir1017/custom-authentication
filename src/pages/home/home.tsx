import { useGetMeQuery } from "@/redux/features/users/userApi";

const Home = () => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetMeQuery(undefined);

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!isLoading && !isError && userData) {
    content = (
      <div>
        <h1>Welcome,</h1>
      </div>
    );
  }

  return content;
};

export default Home;
