import {AsyncStorage} from "react-native";

/**
 * 缓存用户信息
 * @param data
 */
export async function storeAccount(data) {
    try {
        //TODO 用户信息应保存在redux中
        await AsyncStorage.multiSet([["token", data.token], ["user", JSON.stringify(data.user)]]);
    } catch (e) {
        console.warn('Error: ', e);
    }
}