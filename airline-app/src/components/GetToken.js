import { useAuth0 } from "../react-auth0-spa";

function test() {
    const { getTokenSilently } = useAuth0();

        const callApi = async () => {
          try {
            const token = await getTokenSilently();
            return token
          } catch (error) {
            console.error(error);
          }
        }
        callApi();
}

export default token = test();