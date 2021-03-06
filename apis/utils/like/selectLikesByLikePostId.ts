import {connect} from "../../src/database";

/**
 * Gets likes by post id.
 *
 * @param {string} likePostId - id of the post that has likes
 * @return {(Array | undefined)} rows - array that contains the like data found, or undefined if errors occur
 **/
export async function selectLikesByLikePostId(likePostId: string) {
	try {

		const mySqlConnection = await connect();

		const mySqlQuery = "SELECT BIN_TO_UUID(likePostId) as likePostId, BIN_TO_UUID(likeProfileId) as likeProfileId FROM `like` WHERE likePostId = UUID_TO_BIN(:likePostId)";

		const [rows] = await mySqlConnection.execute(mySqlQuery, {likePostId})
		return rows

	} catch(error) {
		console.log(error)
		return undefined
	}
}