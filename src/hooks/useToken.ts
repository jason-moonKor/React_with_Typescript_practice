import React from "react";
import {useSelector} from "react-redux";

import {RootState} from "../types";

function useToken() {
	const token = useSelector<RootState, string | null>(
		(state) => state.auth.token
	);
	return token;
}

export default useToken;
